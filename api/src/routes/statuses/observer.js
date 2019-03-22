const Session = require('../../models/session')

module.exports = async (ctx, next) => {
  const session = await Session.lastVisitTo(7, 27)

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
