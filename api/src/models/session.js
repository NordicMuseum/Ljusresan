const config = require('../config')
const Model = require('mongorito').Model
const has = require('lodash/has')
const difference = require('lodash/difference')
const dmx = require('../modules/DMX')

const parseDestination = (destination) => {
  return {
    room: destination.split(':')[0],
    station: destination.split(':')[1]
  }
}

module.exports = class Session extends Model {
  collection () {
    return 'sessions'
  }

  defaults () {
    return {
      stations: {}, ended: false
    }
  }

  configure () {
    this.before('save', this.validate)
    this.before('save', this.toggleLight)
  }

  * validate () {
    const destination =
      difference(this.attributes.stations, this.previous.stations)[0]

    if (destination) {
      const {room, station} = parseDestination(destination)

      if (!has(config.commandMapping, [room, station])) {
        throw new Error('Destination not found in commandMapping')
      }
    }
  }

  * toggleLight () {
    const destination =
      difference(this.attributes.stations, this.previous.stations)[0]

    if (destination) {
      const {room, station} = parseDestination(destination)
      dmx.on(room, station)
    }
  }
}
