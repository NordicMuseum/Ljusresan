const Session = require('../../models/session')

module.exports = async (ctx, next) => {
  const session = await Session.lastVisitTo(6, 26)

  if (session) {
    this.response.body = session
    this.response.status = 200
  } else {
    this.response.body = {
      message: 'Most recent final station visit not found'
    }
    this.response.status = 404
  }
}
