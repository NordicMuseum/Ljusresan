const Session = require('../models/session')

module.exports = function * (next) {
  const tagUid = this.request.headers['x-taguid']

  this.session = yield Session.findOne({
    tagUid, hasEnded: false
  })

  if (!this.session) {
    this.session = new Session({tagUid})
  }

  yield next
}
