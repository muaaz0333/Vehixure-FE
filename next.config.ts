import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optional: Keep this for Webpack fallback (e.g., local dev with --webpack)
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  // Add this for Turbopack compatibility
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;