const config = require('../../../config')
const r = require('rethinkdbdash')(config.rethinkdb)

module.exports = function * (next) {
  const event = Object.assign({}, this.request.body, {timestamp: new Date()})

  try {
    yield r.db(config.rethinkdb.db).table('events').insert(event)
    this.response.status = 201
  } catch (error) {
    this.response.status = 500
    this.response.body = error.message
  }
}
