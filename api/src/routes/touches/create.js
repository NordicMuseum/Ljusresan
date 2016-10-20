module.exports = function * (next) {
  const session = this.session
  const {action, staticUserData: {room, station}} = this.request.body

  const isFinalStation = (room === 6 && station === 27)

  if (action === 'touch') {
    try {
      if (isFinalStation) {
        session.set('ended', true)
      } else {
        session.set(`stations.${room}.${station}`, true)
      }

      yield session.save()

      this.status = 204
    } catch (error) {
      this.body = {
        error: error.message
      }

      this.status = 404
    }
  }
}
