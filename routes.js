// routes.js

const { Router } = require('@edgio/core/router')

const ONE_YEAR = 365 * 24 * 60 * 60

const edgeOnly = {
  browser: false,
  edge: { maxAgeSeconds: ONE_YEAR },
}

const edgeAndBrowser = {
  browser: { maxAgeSeconds: ONE_YEAR },
  edge: { maxAgeSeconds: ONE_YEAR },
}

const handler = ({ cache, serveStatic }, cacheConfig, path) => {
  cache(cacheConfig)
  serveStatic(path)
}

module.exports = new Router()

.match('/en:path*', ({ serveStatic, cache }) => {
  
   serveStatic('public/en:path*')
})
  
  // Path(s) that do not have a "." as well as "/" to serve the fallback page
  .get('/:path*/:file([^\\.]+|)', ({ appShell, cache }) => {
    cache(edgeOnly)
    appShell('public/index.html')
  }) 
  
  // All other paths to be served from the src directory
  .get('/:path*', res => handler(res, edgeOnly, 'public/:path*'))