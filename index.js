const config = require('./src/config')
const app = require('koa')()
const router = require('koa-router')()

/**
 * Receive nfc touch:on and touch:off events */
router.post('/events', require('./src/routes/events/create'))

/**
 * Returns the status for a tag */
router.get('/status/:tag', require('./src/routes/statuses/show'))

app
  .use(require('koa-bodyparser')())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(
    require('koa-favicon')(require('path').join(__dirname, './src/favicon.ico'))
  )

app.listen(config.koa.port, () => {
  console.log('Nordiskt Ljus service listening on port', config.koa.port)
})
