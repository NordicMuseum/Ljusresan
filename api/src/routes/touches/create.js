const config = require('../../config')
const Light = require('../../modules/light')
const union = require('lodash').union

module.exports = function * (next) {
  const {action, staticUserData: {room, station}} = this.request.body

  if (action === 'touch') {
    const light = new Light(config.stations[station].host, 5000)
    light.on('some-id').close()
    if (station === 27) {
      this.session.set('finalStationTimestamp', new Date())
    }
  }

  if (action === 'remove') {
    if (room === 1 && station === 1) {
      this.session.set('stations', [])
    } else {
      this.session.set('stations', union(
        this.session.get('stations'), [`${station}:${room}`]
      ))
    }
  }

  yield this.session.save()

  this.response.status = 200
}
