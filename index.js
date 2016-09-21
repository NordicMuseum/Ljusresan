
var roomsConfig = require('./room-config.js')
var koa = require('koa')
var router = require('koa-router')()
var getRawBody = require('raw-body')
var favicon = require('koa-favicon')
var r = require('rethinkdb')
var path = require('path')

// rehink db connection
var rConnection = null

// connect to rethinkdb, create table if not exists
r.connect({
  host: 'localhost',
  port: 28015
}, function (err, conn) {
  if (err) throw err

  rConnection = conn

  // create table if not already exists
  r.db('test').tableList().run(conn, (err, tables) => {
    if (err) throw err

    var tableExists = tables.indexOf('lightevents') !== -1

    if (tableExists) {
      console.log(`Table lightevents exists`)
    } else {
      console.log(`Table lightevents does not exist, creating it`)

      r.db('test').tableCreate('lightevents').run(conn, function (err, res) {
        if (err) throw err
      })
    }
  })
})

console.log(`Starting...`)
console.log(`Room config contains ${roomsConfig.length} rooms`)

function saveLightevent (json) {
  json.timestamp = new Date()

  r.table('lightevents').insert(json).run(rConnection, (err, res) => {
    console.log('insert event err', err)
    console.log('insert event res', res)
    if (err) throw err
  })
}

/**
 * Receive nfc touch and remove
 * store each touch/remove in db
 * Call to here come from the Raspberrys that have NFC cards
 */
router.post('/lightevent', function* (next) {
  console.log('post lightevent')

  var string = yield getRawBody(this.req, {
    length: this.length,
    limit: '1mb',
    encoding: this.charset
  })

  var json = JSON.parse(string)

  console.log('json is', json)

  saveLightevent(json)

  this.body = 'post lightevent'

  yield next
})

/**
 * Returns the status for a tag
 * Used from the Ipad app to determine if a tag has completed all rooms etc.
 */
router.get('/getTagStatus/:tagUid', function* (next) {
  console.log('getTagStatus')

  let tagUid = this.params.tagUid

  let jsonReturn = {
    tagUid
  }

  // get number of times this tag has been used, no matter the day
  yield r.table('lightevents').filter({ tagUid }).count().run(rConnection, (err, count) => {
    if (err) throw err

    jsonReturn.totalCount = count
  })

  // get the selected tag and all events from today
  yield r.table('lightevents').filter({ tagUid }).filter(function (row) {
    return row('timestamp').date().eq(r.now().date())
  }).run(rConnection, (err, cursor) => {
    if (err) throw err

    cursor.toArray((err, result) => {
      if (err) {
        throw err
      }

      jsonReturn.todayEvents = result
    })
  })

  this.body = jsonReturn

  yield next
})

var app = koa()

app.use(favicon(path.join(__dirname, '/favicon.ico')))
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)