const config = require('../../config')
const dmx = require('../../modules/dmx')

module.exports = function * (next) {
  const session = this.session
  const {action, staticUserData: {room, station}} = this.request.body

  if (action === 'touch') {
    try {
      session.set(`stations.${room}.${station}`, true)

      // Check for stations within the same room with an `dependsOn` [].
      // Given this structure for example:
      //
      //  3: [
      //    {id: 1, ...},
      //    {id: 2: ...},
      //    {
      //      id: 3,
      //      T: '04',
      //      P: '09',
      //      D: '01',
      //      dependsOn: [1, 2]
      //    }
      //  ]
      //
      // We want to turn on 3-3 if 3-1 and 3-2 are `true`.

      const withDependencies = config.commandMapping[room].filter(station => {
        return station.dependsOn
      })

      withDependencies.forEach(station => {
        const shouldTurnOn = station.dependsOn.every(id => {
          return session.get('stations')[room][id]
        })

        if (shouldTurnOn) {
          dmx.on(room, station.id)
          setTimeout(() => { dmx.off(room, station.id) }, config.dmx.timeout)
        }
      })

      yield session.save()

      this.status = 204
    } catch (error) {
      this.body = { error: error.message }
      this.status = 404
    }
  }
}
