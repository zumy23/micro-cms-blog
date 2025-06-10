import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['react-syntax-highlighter'],
  },
}

// Setup dev platform for local development
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform()
}

export default nextConfig
