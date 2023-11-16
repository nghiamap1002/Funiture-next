/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: process.env.NODE_ENV === "development" ? true : false,
};

module.exports = nextConfig;
