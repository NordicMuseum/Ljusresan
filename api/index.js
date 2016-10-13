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

router.post('/touches',
  require('./src/routes/touches/create'))

router.get('/statuses',
  require('./src/routes/statuses/show'))

router.get('/final-station',
  require('./src/routes/touches/final-station'))

/**
 * Configure application
 */

const Session = require('./src/models/session')

app
  .use(require('koa-bodyparser')())
  .use(function * (next) {
    const tagUid =
      this.request.query.tagUid || this.request.body.tagUid

    this.session = yield Session.findOne({
      tagUid
    })

    if (!this.session && tagUid) {
      this.session = new Session({tagUid, stations: []})
    }

    yield next
  })
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
