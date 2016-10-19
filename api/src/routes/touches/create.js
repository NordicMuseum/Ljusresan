const light = require('../../modules/light')
const union = require('lodash/union')

module.exports = function * (next) {
  const session = this.session
  const {action, staticUserData: {room, station}} = this.request.body

  const isFinalStation = (room === 6 && station === 27)

  if (action === 'touch') {
    try {
      light.on(room, station)
      this.status = 204
    } catch (error) {
      this.status = 404
    }
  }

  if (action === 'remove') {
    } else if (isFinalStation) {
      session.set('endedAt', new Date())
    } else {
      session.set('stations', union(
        session.get('stations'), [`${room}:${station}`]
      ))

      light.off(room, station)
    }

    yield session.save()

    this.response.status = 204
  }
}
