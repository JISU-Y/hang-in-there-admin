/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'utfs.io',
      'api.slingacademy.com',
      'hid-banner.s3.ap-northeast-2.amazonaws.com',
      'hid-event.s3.ap-northeast-2.amazonaws.com',
      'hid-profile.s3.ap-northeast-2.amazonaws.com',
      'tong.visitkorea.or.kr'
    ]
  }
};

module.exports = nextConfig;
