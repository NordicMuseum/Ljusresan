const Session = require('../models/session')

module.exports = function * (next) {
  const tagUid =
    this.request.query.tagUid || this.request.body.tagUid

  this.session = yield Session.findOne({
    tagUid
  })

  if (!this.session && tagUid) {
    this.session = new Session({tagUid, stations: []})
  }

  yield next
}
