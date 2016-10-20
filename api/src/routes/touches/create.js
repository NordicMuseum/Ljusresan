const union = require('lodash/union')

module.exports = function * (next) {
  const session = this.session
  const {action, staticUserData: {room, station}} = this.request.body

  const isFinalStation = (room === 6 && station === 27)

  if (action === 'touch') {
    try {
      session.set('stations', union(
        session.get('stations'), [`${room}:${station}`]
      ))
      yield session.save()

      this.status = 204
    } catch (error) {
      this.status = 404
    }
  }
}
