const Session = require('../../models/session')

module.exports = function * (next) {
  let session = yield Session
    .exists('finalStationTimestamp')
    .sort('finalStationTimestamp', -1)
    .findOne()

  if (session) {
    this.response.status = 200
    this.response.body = {
      tagUid: session.get('tagUid'),
      stations: session.get('stations')
    }
  } else {
    this.response.status = 404
  }
}
