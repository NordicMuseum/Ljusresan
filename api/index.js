const config = require('./src/config')

/**
 * Connect to database
 */
const Mongorito = require('mongorito')
Mongorito.connect(config.database.host + '/nordisktljus')

/**
 * Setup koa & routes
 */
const app = require('koa')()
const router = require('koa-router')()

router.del('/sessions',
  require('./src/routes/sessions/delete'))

router.post('/touches',
  require('./src/routes/touches/create'))

router.get('/statuses',
  require('./src/routes/statuses/show'))

router.get('/statuses/final',
  require('./src/routes/statuses/final'))

router.get('/statuses/observer',
  require('./src/routes/statuses/final'))

/**
 * Configure application
 */
app
  .use(require('koa-bodyparser')())
  .use(require('./src/middleware/session'))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(require('koa-favicon')(
    require('path').join(__dirname, './src/assets/favicon.ico')
  ))

/**
 * Boot application
 */
app.listen(config.koa.port, () => {
  console.log('Nordiskt Ljus listening on port', config.koa.port)
})
