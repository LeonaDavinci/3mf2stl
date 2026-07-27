import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the Turbopack workspace root so it doesn't pick up a stray lockfile
  // outside this project.
  turbopack: { root: process.cwd() },
};

export default nextConfig;
