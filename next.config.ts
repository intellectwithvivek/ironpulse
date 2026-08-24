import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.pexels.com', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
      { protocol: 'https', hostname: 'i.pravatar.cc', pathname: '/**' },
    ],

    /*
      Default is [..., 2048, 3840]. Dropping 3840 matters here because every
      photograph on this site is hotlinked and proxied through the optimizer:
      a full-bleed hero with `sizes="100vw"` asks for the largest candidate, and
      at 3840 the optimizer was being told to *upscale* a 2400px source. That is
      the slowest and most memory-hungry path it has, it is the one most likely
      to time out on a cold cache or a constrained host, and the reward is a
      background photograph nobody will ever inspect at 4K.

      2048 is ample for a scrim-covered, desaturated backdrop and keeps every
      remote fetch inside the source's own resolution, so nothing is upscaled.
    */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
}

export default nextConfig
