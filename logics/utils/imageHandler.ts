import axios from 'axios';
import { getAccessToken } from '@domains/auth/utils/authTokenHandler';
import { ApiDataResponseType } from '@models/client';

export interface PresignedPostDataType {
  url: string; // 프론트에서 직접 올려야 하는 s3 경로
  fields: {
    key: string;
    bucket: string;
    'X-Amz-Algorithm': string;
    'X-Amz-Credential': string;
    'X-Amz-Date': string;
    Policy: string;
    'X-Amz-Signature': string;
  };
}
type PresignedFieldsKeyType = keyof PresignedPostDataType['fields'];

export type UploadImageType = 'profile' | 'banner' | 'event';

/**
 * 요청을 재시도하는 함수
 */
async function retryUpload(
  url: string,
  formData: FormData,
  retries: number
): Promise<void> {
  try {
    await axios.post(url, formData);
  } catch (error) {
    if (retries <= 1) {
      throw error; // 마지막 재시도에서도 실패 시 에러 던짐
    } else {
      console.warn(`Retrying upload... (${4 - retries}/3)`);
      await retryUpload(url, formData, retries - 1);
    }
  }
}

/**
 * Image를 aws에 업로드하는 api
 *
 * **이미지 업로드 요청 방법**
 * 1. `/presigned` 요청하여 presignedUrl 및 data 받아오기 (FIP 백엔드로 요청)
 * 2. `presignedUrl` 에 presignedData와 File 리스트를 함께 요청 (aws s3로 요청)
 * 3. `/file` 요청하여 s3 저장했던 file 정보를 전달, 백엔드에 저장 (FIP 백엔드로 요청) .
 * 4. 이후 ids에 들어있는 id: number 를 사용
 *
 * @param File - File[] 업로드하려고 하는 file 리스트 (File 객체 배열)
 *
 * @returns ResponseCreateFile
 */
export async function uploadFile(file: File, imageType: UploadImageType) {
  try {
    // 1
    let presignedData: PresignedPostDataType;

    const accessToken = getAccessToken();

    try {
      const { data } = await axios.get<
        ApiDataResponseType<PresignedPostDataType>
      >(
        `${process.env.NEXT_PUBLIC_HANGINTHERE_API_END_POINT}/v1/admin/image/sign-url`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          params: {
            type: imageType,
            fileType: file.type
          }
        }
      );

      presignedData = data.data;
    } catch (error) {
      alert('Error during presigned URL request: error');
      console.error('Error during presigned URL request:', error);
      return;
    }

    // 2
    try {
      // NOTE: formData에 presignedData 정보들과 File을 append.
      const formData = new FormData();

      for (const key in presignedData.fields) {
        formData.append(
          key,
          presignedData.fields[key as PresignedFieldsKeyType]
        );
      }
      formData.append('Content-Type', file.type);
      formData.append('file', file);

      retryUpload(presignedData.url, formData, 3); // NOTE: aws s3 url에 요청
    } catch (error) {
      alert('Failed to upload the image to S3. Please retry.');
      console.error('Error during file upload to S3:', error);

      throw error;
    }

    // 3
    const imageUrl = `${presignedData.url}${presignedData.fields.key}`;

    return imageUrl;
  } catch (error) {
    console.error('Unexpected error:', error);

    throw error;
  }
}

export async function uploadFiles(files: File[], imageType: UploadImageType) {
  try {
    // 파일을 병렬적으로 업로드할 프로미스 배열
    const uploadPromises = files.map(async (file) => {
      let presignedData: PresignedPostDataType;

      const accessToken = getAccessToken();

      try {
        const { data } = await axios.get<
          ApiDataResponseType<PresignedPostDataType>
        >(
          `${process.env.NEXT_PUBLIC_HANGINTHERE_API_END_POINT}/v1/admin/image/sign-url`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            params: {
              type: imageType,
              fileType: file.type
            }
          }
        );

        presignedData = data.data;
      } catch (error) {
        alert('Error during presigned URL request: error');
        console.error('Error during presigned URL request:', error);
        throw error; // 에러 발생 시 프로미스 거부
      }

      // FormData에 presignedData 정보들과 File을 append
      const formData = new FormData();
      for (const key in presignedData.fields) {
        formData.append(
          key,
          presignedData.fields[key as PresignedFieldsKeyType]
        );
      }
      formData.append('Content-Type', file.type);
      formData.append('file', file);

      try {
        await retryUpload(presignedData.url, formData, 3); // AWS S3 URL에 요청
      } catch (error) {
        alert('Failed to upload the image to S3. Please retry.');
        console.error('Error during file upload to S3:', error);
        throw error; // 에러 발생 시 프로미스 거부
      }

      // 이미지 URL 반환
      return `${presignedData.url}${presignedData.fields.key}`;
    });

    // 모든 파일 업로드 프로미스 완료 대기
    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls; // 업로드된 이미지 URL 배열 반환
  } catch (error) {
    console.error('Unexpected error:', error);
    throw error;
  }
}

export async function convertURLtoFile(url: string) {
  const response = await fetch(url);
  const data = await response.blob();
  const ext = url.split('.').pop();
  const filename = url.split('/').pop();
  const metadata = { type: `image/${ext}` };

  const file = new File([data], filename!, metadata);

  Object.assign(file, {
    preview: URL.createObjectURL(file)
  });

  return file;
}

export async function convertUrlListToFileList(imageList: string[]) {
  if (!imageList || !Array.isArray(imageList)) {
    throw new Error('유효한 이미지 배열이 아닙니다.');
  }

  const filePromises = imageList.map(async (image) => {
    try {
      const file = await convertURLtoFile(image);
      return file; // 변환 성공 시 File 객체 반환
    } catch (error) {
      console.error(`URL 변환 오류: ${image}`, error);
      return undefined;
    }
  });

  const results = await Promise.all(filePromises);
  // undefined 값을 필터링하여 File 객체만 포함
  return results.filter((file): file is File => file !== undefined);
}
