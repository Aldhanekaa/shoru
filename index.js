if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const { loadNuxt, build } = require('nuxt')
const helmet = require('helmet')
const mongoose = require('mongoose')

const app = require('express')()

const mainAPIRoute = require('./server/routers/main')
const isDev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

app.use(require('express').json())
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    crossOriginEmbedderPolicy: false,
    noSniff: true,
    xssFilter: true,
    hidePoweredBy: true,
  })
)

/* eslint-disable */
let MongoDB_URI =
  process.env.mongoDB_URI || 'mongodb://127.0.0.1:27017/mts-technonatura-server'
mongoose.connect(MongoDB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
/* eslint-enable */

async function start() {
  //   We get Nuxt instance
  const nuxt = await loadNuxt(isDev ? 'dev' : 'start')
  mainAPIRoute(app)

  // Render every route with Nuxt.js
  app.use(nuxt.render)
  // Build only in dev mode with hot-reloading
  if (isDev) {
    build(nuxt)
  }
  // Listen on port 5000
  app.listen(port, () => {
    console.log(`Server is booming on port ${port}
      Visit http://localhost:${port}`)
  })

  return app
}

module.exports = start()
