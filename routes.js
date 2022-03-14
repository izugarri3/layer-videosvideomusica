// This file was added by layer0 init.
// You should commit this file to source control.

const { Router } = require('@layer0/core/router')

const ONE_MIN = 5 * 5
const ONE_HOUR = 60 * 60
const ONE_DAY = 24 * ONE_HOUR
const ONE_YEAR = 365 * ONE_DAY

const edgeOnly = {

  edge: { maxAgeSeconds: 3500 },
}

const edgeAndBrowser = {

  edge: { maxAgeSeconds: 3502 },
}

module.exports = new Router()
  .prerender([{ path: '/' }])

  // match client-side routes that aren't a static asset
  // and serve the app shell. client-side router will
  // handle the route once it is rendered
  .match('/:path*/:file([^\\.]+|)', ({ appShell, cache }) => {
    cache(edgeOnly)
    appShell('public/index.html')
  })
  
  // match other assets such as favicon, manifest.json, etc
  .match('/:path*', ({ serveStatic, cache }) => {
  
   serveStatic('public/:path*')
  })
  // send any unmatched request to serve the static index.html
  .fallback(({ serveStatic }) => serveStatic('public/index.html'))