const config = require('./src/config')
const app = require('koa')()
const router = require('koa-router')()

router.get('/', function * (next) {
  this.body = 'Hello world!'
})

app
  .use(require('koa-bodyparser')())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(
    require('koa-favicon')(require('path').join(__dirname, './src/assets/favicon.ico'))
  )

app.listen(config.koa.port, () => {
  console.log('Nordiskt Ljus listening on port', config.koa.port)
})
