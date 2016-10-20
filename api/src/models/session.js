const config = require('../config')
const Model = require('mongorito').Model
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
      stations: [], ended: false
    }
  }
}
