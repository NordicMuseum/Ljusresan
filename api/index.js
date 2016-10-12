const config = require('./src/config')

/**
 * Connect to database
 */
const Mongorito = require('mongorito')
Mongorito.connect('mongo/nordisktljus')

/**
 * Setup koa & routes
 */
const app = require('koa')()
const router = require('koa-router')()

router.post('/touches', require('./src/routes/touches/create'))

/**
 * Configure application
 */
app
  .use(require('koa-bodyparser')())
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
