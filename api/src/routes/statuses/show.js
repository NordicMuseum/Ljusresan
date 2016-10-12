const Session = require('../../models/session')

module.exports = function * (next) {
  const session = yield Session.findOne({
    tagUid: this.request.query.tagUid
  })

  if (!session) {
    this.response.status = 404
  }

  if (session) {
    this.response.status = 200
    this.response.body = {
      stations: session.get('stations')
    }
  }
}
