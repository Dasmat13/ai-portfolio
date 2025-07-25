import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone", // ✅ This tells Next.js to create the .next/standalone folder
};

export default nextConfig;
