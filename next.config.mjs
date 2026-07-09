/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/projects',
        destination: '/',
        permanent: true,
      },
      {
        source: '/design',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tools',
        destination: '/',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        // Cache face images aggressively (1 year)
        source: '/faces/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
