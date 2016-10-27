const config = require('../../config')

module.exports = function * (next) {
  const session = this.session
  const {action, staticUserData: {room, station}} = this.request.body

  const now = new Date()

  if (action === 'touch') {
    try {
      session.set(`stations.${room}.${station}`, now)

      // Check for stations within the same room with an `onWhen` [].
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
      //      onWhen: [1, 2]
      //    }
      //  ]
      //
      // We want to turn on 3-3 if 3-1 and 3-2 are `true`.

      // get all stations with .onWhen []
      const withOnWhen = config.commandMapping[room].filter(s => {
        return s.onWhen
      })

      if (withOnWhen) {
        withOnWhen.forEach(s => {
          const shouldTurnOn = s.onWhen.every(id => {
            return session.get(`stations.${room}.${id}`)
          })

          if (shouldTurnOn) {
            session.set(`stations.${room}.${s.id}`, now)
          }
        })
      }

      // Check for stations within the same room with an `dependsOn` [].
      // Given this structure for example:
      //
      //  3: [
      //    {id: 1, ...},
      //    {
      //      id: 3,
      //      T: '04',
      //      P: '09',
      //      D: '01',
      //      dependsOn: [1]
      //    },
      //    {
      //      id: 3,
      //      T: '04',
      //      P: '09',
      //      D: '01',
      //      dependsOn: [1]
      //    }
      //  ]
      //
      // We want to disable dmx trigger unless 3-1 has been set to `true`.

      const {dependsOn} = config.commandMapping[room].find(s => {
        return s.id === station
      })

      if (dependsOn) {
        const dependenciesHaveBeenMet = dependsOn.every(id => {
          return session.get(`stations.${room}.${id}`)
        })

        if (dependenciesHaveBeenMet) {
          session.set(`stations.${room}.${station}`, now)
        } else {
          throw new Error('Destination dependency not met')
        }
      } else {
        session.set(`stations.${room}.${station}`, now)
      }

      yield session.save()

      this.status = 204
    } catch (error) {
      this.body = { error: error.message }
      this.status = 404
    }
  }
}
