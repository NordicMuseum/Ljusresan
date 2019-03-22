const config = require('./src/config')
const { Database } = require('mongorito')
const Koa = require('koa')
const Router = require('koa-router')

;(async function () {
  const database = new Database(config.database.host + '/nordisktljus')

  await database.connect()

  const app = new Koa()
  const router = new Router()

  router.del('/sessions',
    require('./src/routes/sessions/delete'))

  router.post('/touches',
    require('./src/routes/touches/create'))

  router.get('/statuses',
    require('./src/routes/statuses/show'))

  router.get('/statuses/final',
    require('./src/routes/statuses/final'))

  router.get('/statuses/observer',
    require('./src/routes/statuses/observer'))

  app
    .use(require('koa-bodyparser')())
    .use(require('./src/middleware/session'))
    .use(router.routes())
    .use(router.allowedMethods())
    .use(require('koa-favicon')(
      require('path').join(__dirname, './src/assets/favicon.ico')
    ))

  app.listen(config.koa.port, () => {
    console.log('Ljusresan API listening on port', config.koa.port)
  })
})()
