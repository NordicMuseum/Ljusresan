const config = require('../config')
const Model = require('mongorito').Model
const dmx = require('../modules/dmx')

module.exports = class Session extends Model {
  collection () {
    return 'sessions'
  }

  defaults () {
    return {
      stations: {}, hasEnded: false
    }
  }

  configure () {
    this.before('save', this.validate)
    this.before('save', this.toggleLight)
  }

  * validate () {
    const room = this.changed.stations
    const hasEnded = this.attributes.hasEnded

    if (room && !hasEnded) {
      for (const r in room) {
        for (const s in room[r]) {
          const idRoom = parseInt(r)
          const idStation = parseInt(s)

          const found = config.stationMapping[idRoom].find(station => {
            return station.id === idStation
          })

          if (!found) {
            throw new Error('Destination not found in `stationMapping`')
          }
        }
      }
    }
  }

  * toggleLight () {
    const room = this.changed.stations
    const hasEnded = this.attributes.hasEnded

    if (room && !hasEnded) {
      for (const r in room) {
        for (const s in room[r]) {
          const idRoom = parseInt(r)
          const idStation = parseInt(s)

          const {timeout} = config.stationMapping[idRoom].find(station => {
            return station.id === idStation
          })

          dmx.on(idRoom, idStation, timeout)
        }
      }
    }
  }

  static lastVisitTo (idRoom, idStation) {
    return this.sort({
      [`stations.${idRoom}.${idStation}`]: -1
    })
    .limit(1).find({
      [`stations.${idRoom}.${idStation}`]: {
        $exists: true
      },
      hasEnded: false
    })
    .then(docs => docs[0])
  }
}
