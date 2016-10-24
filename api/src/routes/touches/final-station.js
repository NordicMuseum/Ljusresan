const Session = require('../../models/session')

module.exports = function * (next) {
  const session = yield Session.mostRecentFinalStationVisit()

  if (session) {
    this.response.body = session
    this.response.status = 200
  } else {
    this.response.status = 404
  }
}
