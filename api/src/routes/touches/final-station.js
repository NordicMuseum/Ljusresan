const Session = require('../../models/session')

module.exports = function * (next) {
  let session = yield Session.exists('endedAt').sort('endedAt', -1).findOne()

  if (session) {
    this.response.status = 200
    this.response.body = {
      updatedAt: session.get('finalStationTimestamp'),
      tagUid: session.get('tagUid'),
      stations: session.get('stations')
    }
  } else {
    this.response.status = 404
  }
}
