// This file was added by layer0 init.
// You should commit this file to source control.

const { Router } = require('@layer0/core/router')


module.exports = new Router()
  .prerender([{ path: '/' }])

  // match client-side routes that aren't a static asset
  // and serve the app shell. client-side router will
  // handle the route once it is rendered
  .match('/:path*/:file([^\\.]+|)', ({ appShell}) => {    
    appShell('public/index.html')
  })
  
 // match other assets such as favicon, manifest.json, etc
  .match('/:path*', ({ serveStatic, cache }) => {
  
   serveStatic('public/:path*')
  })
  // send any unmatched request to serve the static index.html
  .fallback(({ serveStatic }) => serveStatic('public/index.html'))
