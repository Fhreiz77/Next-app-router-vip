/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental:{
    turbopack: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https", 
        hostname: "assets.adidas.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
