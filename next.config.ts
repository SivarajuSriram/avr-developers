import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [20, 72, 75, 82],
  },
};

export default nextConfig;
