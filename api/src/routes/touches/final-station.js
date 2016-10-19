const Session = require('../../models/session')

module.exports = function * (next) {
  const session = yield Session.where({
    tagUid: this.session.tagUid,
    ended: true
  }).sort({
    updated_at: -1
  }).findOne()

  if (session) {
    this.response.body = {
      tagUid: session.get('tagUid'),
      stations: session.get('stations'),
      createdAt: session.get('created_at'),
      updatedAt: session.get('updated_at')
    }

    this.response.status = 200
  } else {
    this.response.status = 404
  }
}
