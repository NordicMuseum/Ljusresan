const Session = require('../../models/session')

module.exports = function * (next) {
  let session = yield Session.exists('endedAt').sort('endedAt', -1).findOne()

  if (session) {
    this.response.body = {
      tagUid: session.get('tagUid'),
      stations: session.get('stations'),
      endedAt: session.get('endedAt')
    }

    this.response.status = 200
  } else {
    this.response.status = 404
  }
}
