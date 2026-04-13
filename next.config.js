const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'assets.adidas.com', pathname: '/**' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com', pathname: '/**' },
    ],
  },
  typescript: {
    ignoreBuildErrors: true, 
  },
};

module.exports = nextConfig;