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
      for (let r in room) {
        for (let s in room[r]) {
          const room = parseInt(r)
          const station = parseInt(s)

          const found = config.commandMapping[room].find(s => {
            return s.id === station
          })

          if (!found) {
            throw new Error('Destination not found in `commandMapping`')
          }

          dmx.on(room, station)
        }
      }
    }
  }

  * toggleLight () {
    const room = this.changed.stations
    const hasEnded = this.attributes.hasEnded

    if (room && !hasEnded) {
      for (let r in room) {
        for (let s in room[r]) {
          const room = parseInt(r)
          const station = parseInt(s)
          dmx.on(room, station)
        }
      }
    }
  }

  static lastVisitTo (room, station) {
    return this.sort({ [`stations.${room}.${station}`]: -1 }).limit(1).find({
      [`stations.${room}.${station}`]: { $exists: true }, hasEnded: false
    }).then(docs => docs[0])
  }
}
