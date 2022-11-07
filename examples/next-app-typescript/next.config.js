const { UnitlessPlugin } = require('@unitless-io/loader');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    if (dev && !isServer) {
      config.plugins.push(new UnitlessPlugin());

      config.module.rules.push({
        test: /\.(js|ts)$/,
        use: [
          {
            loader: '@unitless-io/loader',
          },
        ],
      });
    }

    return config;
  },
};

module.exports = nextConfig;
