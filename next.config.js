/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/dnd',
  images: {
      // domains: ...,
      path: `dnd/_next/image`,
    },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push(
      {
        test: /\.md$/,
        // This is the asset module.
        type: 'asset/source',
      }
    )
    return config
  },  
}


module.exports = nextConfig
