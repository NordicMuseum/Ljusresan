const union = require('lodash').union

module.exports = function * (next) {
  const {action, staticUserData: data} = this.request.body

  if (action === 'touch') {
    if (data.station === 27) {
      this.session.set('finalStationTimestamp', new Date())
    }
  }

  if (action === 'remove') {
    if (data.room === 1 && data.station === 1) {
      this.session.set('stations', [])
    } else {
      this.session.set('stations', union(
        this.session.get('stations'), [[data.room, data.station].join(':')]
      ))
    }
  }

  yield this.session.save()

  this.response.status = 200
}
