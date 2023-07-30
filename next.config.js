/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.chess.com", "localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.chess.com",
        port: "",
        pathname: "/account123/**",
      },
    ],
  },
};

module.exports = nextConfig;
