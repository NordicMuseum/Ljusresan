const Session = require('../../models/session')

module.exports = function * (next) {
  const session = yield Session.mostRecentObserverVisit()

  if (session) {
    this.response.body = session
    this.response.status = 200
  } else {
    this.response.body = {
      message: 'Most recent observer station visit not found'
    }
    this.response.status = 404
  }
}
