const Session = require('../../models/session')
const union = require('lodash').union

module.exports = function * (next) {
  const {action, tagUid, staticUserData: data} = this.request.body

  let session = yield Session.findOne({tagUid})

  if (!session) {
    session = new Session({tagUid, stations: []})
  }

  if (action === 'touch') {

  }

  if (action === 'remove') {
    if (data.room === 1 && data.station === 1) {
      session.set('stations', [])
    } else {
      session.set('stations', union(
        session.get('stations'), [[data.room, data.station].join(':')]
      ))
    }

    yield session.save()
  }

  this.response.status = 200
}
