const config = require('../../config')

module.exports = function * (next) {
  const session = this.session
  const {
    action,
    staticUserData: {
      room: idRoom,
      station: idStation
    }
  } = this.request.body

  const now = new Date()

  if (action === 'touch') {
    try {
      session.set(`stations.${idRoom}.${idStation}`, now)

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
      const withOnWhen = config.commandMapping[idRoom].filter(station => {
        return station.onWhen
      })

      if (withOnWhen) {
        withOnWhen.forEach(station => {
          const shouldTurnOn = station.onWhen.every(idDependency => {
            return session.get(`stations.${idRoom}.${idDependency}`)
          })

          if (shouldTurnOn) {
            session.set(`stations.${idRoom}.${station.id}`, now)
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

      const {dependsOn} = config.commandMapping[idRoom].find(station => {
        return station.id === idStation
      })

      if (dependsOn) {
        const dependenciesHaveBeenMet = dependsOn.every(idDependency => {
          return session.get(`stations.${idRoom}.${idDependency}`)
        })

        if (dependenciesHaveBeenMet) {
          session.set(`stations.${idRoom}.${idStation}`, now)
        } else {
          throw new Error('Destination dependency not met')
        }
      } else {
        session.set(`stations.${idRoom}.${idStation}`, now)
      }

      yield session.save()

      this.status = 204
    } catch (error) {
      this.body = { error: error.message }
      this.status = 404
    }
  }
}
