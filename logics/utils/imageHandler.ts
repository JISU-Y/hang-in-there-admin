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
            fileName: file.name,
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
