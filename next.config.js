module.exports = {
  reactStrictMode: true,
}
const { withLayer0, withServiceWorker } = require('@layer0/next/config')

  module.exports = withLayer0(
    withServiceWorker({
      layer0SourceMaps: true,
      // ...
      // additional Next.js config options here
      // ...
      async rewrites() {
    return [
      {
        source: '/index.html',
        destination: '/',
      },
    ]
  },
    })
  )