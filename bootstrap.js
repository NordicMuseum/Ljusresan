const bluebird = require('bluebird')
const config = require('./src/config')
const r = require('rethinkdbdash')(config.rethinkdb)

bluebird.coroutine(function * () {
  try {
    yield r.dbCreate('nordisktljus')
    console.log('Database `nordisktljus` created')

    yield r.db('nordisktljus').tableCreate('events')
    console.log('Table `events` created')

    yield r.db('nordisktljus').table('events').indexCreate('timestamp')
    console.log('Index `timestamp` created.')
  } catch (error) {
    console.log(error.message)
    console.log(error)
  }

  yield r.getPool().drain()
})()
