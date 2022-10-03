/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    basePath: process.env.NODE_ENV === 'production' ? '/sakai-react' : '',
    publicRuntimeConfig: {
        // Will be available on both server and client
        contextPath: process.env.NODE_ENV === 'production' ? '/sakai-react' : ''
    }
};

module.exports = nextConfig;
