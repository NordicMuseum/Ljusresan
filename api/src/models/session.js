const config = require('../config')
const Model = require('mongorito').Model
const dmx = require('../modules/dmx')
const flatten = require('flat')

const parseStations = (stations) => {
  const obj = Object.keys(flatten(stations))[0].split('.')
  return {
    room: parseInt(obj[0], 10),
    station: parseInt(obj[1], 10)
  }
}

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
    const {stations, hasEnded} = this.changed
    if (stations && !hasEnded) {
      const {room, station} = parseStations(stations)

      const found = config.commandMapping[room].find(s => {
        return s.id === station
      })

      if (!found) {
        throw new Error('Destination not found in `commandMapping`')
      }
    }
  }

  * toggleLight () {
    const stations = this.changed.stations
    const hasEnded = this.attributes.hasEnded
    if (stations && !hasEnded) {
      const {room, station} = parseStations(stations)
      dmx.on(room, station)
      setTimeout(() => { dmx.off(room, station) }, config.dmx.timeout)
    }
  }
}
