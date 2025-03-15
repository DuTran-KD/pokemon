import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      "*",
      "raw.githubusercontent.com",
      "vn.portal-pokemon.com",
      "static.wikia.nocookie.net",
    ],
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp)$/i,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next",
            name: "static/media/[name].[hash].[ext]",
          },
        },
      ],
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/pokemon",
        permanent: true, // Set false if you want a temporary redirect (302)
      },
    ];
  },
};

export default nextConfig;
