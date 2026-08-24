import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    /*
      No `remotePatterns`, deliberately.

      Every photograph on this site is served from `public/images`. The first
      version of this template hotlinked Unsplash, Picsum and Pravatar, and that
      turned out to be three things outside the repo that could break the page:
      the host can rate-limit, a network or region can block it, an image id can
      be withdrawn, and Next's optimizer has to make a server-side fetch before
      it can serve anything — measured at ~5s cold for the hero, which is the
      LCP element. In practice that meant the site rendered with missing
      photographs for anyone whose connection to those hosts was slow or blocked.

      A template is cloned by strangers on networks nobody can predict, so the
      images ship with it. 1.1 MB total, right-sized to how they actually render,
      AVIF where the source offered it. The site now works offline, needs no
      allow-list, and cannot lose an image to someone else's outage.

      Add `remotePatterns` back if you point the data files at a CDN of your own.
    */

    /*
      Default is [..., 2048, 3840]. Nothing here is served above 1920, so the
      larger candidates only invite the optimizer to upscale — its slowest path,
      for a result no one can see.
    */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
}

export default nextConfig
