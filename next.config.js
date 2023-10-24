/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/dnd',
    images: {
        // domains: ...,
        path: `dnd/_next/image`,
      }
}


module.exports = nextConfig
