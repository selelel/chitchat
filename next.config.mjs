/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        CLIENT_URI: process.env.CLIENT_URI,
        SERVER_URI: process.env.SERVER_URI
    }
};

export default nextConfig;
