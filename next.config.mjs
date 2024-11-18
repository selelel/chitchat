/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'chitchat-store.s3.ap-southeast-2.amazonaws.com',
            port: '',
          },
        ],
      },
};

export default nextConfig;
