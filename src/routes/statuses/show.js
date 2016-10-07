const config = require('../../config')
const r = require('rethinkdbdash')(config.rethinkdb)

module.exports = function * (next) {
  try {
    const total = yield r.table('events').filter({tag: this.params.tag}).count()

    this.response.status = 200
    this.response.body = {total}
  } catch (error) {
    this.response.status = 500
    this.response.body = error.message
  }
}
