const config = require('../config')
const net = require('net')

class DMX {
  constructor (host, port) {
    this.client = net.createConnection(port, host)
  }

  on (room, station) {
    const {T, P, D} = config.commandMapping[room][station]
    this.client.write(`>_T${T}_P${P}_D${D}_ON_<`)
  }

  off (room, station) {
    const {T, P, D} = config.commandMapping[room][station]
    this.client.write(`>_T${T}_P${P}_D${D}_OFF_<`)
  }
}

module.exports = new DMX(config.dmx.host, config.dmx.port)
