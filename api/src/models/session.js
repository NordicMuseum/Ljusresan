const config = require('../config')
const Model = require('mongorito').Model
const has = require('lodash/has')
const dmx = require('../modules/DMX')
const flatten = require('flat')

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
    if (this.changed.stations) {
      const path = Object.keys(flatten(this.changed.stations))[0]
      if (!has(config.commandMapping, path)) {
        throw new Error('Destination not found in commandMapping')
      }
    }
  }

  * toggleLight () {
    if (this.changed.stations) {
      const obj = Object.keys(flatten(this.changed.stations))[0].split('.')
      const room = obj[0]
      const station = obj[1]

      dmx.on(room, station)

      setTimeout(() => { dmx.off(room, station) }, config.lightTimeout)
    }
  }
}
