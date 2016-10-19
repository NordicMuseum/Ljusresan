const Session = require('../models/session')

module.exports = function * (next) {
  const tagUid = this.request.headers['x-taguid']

  this.session = yield Session.findOne({
    tagUid, ended: false
  })

  if (!this.session && tagUid) {
    this.session = new Session({tagUid, stations: []})
  }

  yield next
}
