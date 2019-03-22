const Session = require('../models/session')

module.exports = async (ctx, next) => {
  const tagUid = this.request.headers['x-taguid']

  const session = await Session.findOne({
    tagUid,
    hasEnded: false
  })

  this.session = session || new Session({
    tagUid
  })

  await next()
}
