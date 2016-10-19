const config = require('../config')
const net = require('net')

class Light {
  constructor (host, port) {
    this.client = net.createConnection(port, host)
  }

  on (room, station) {
    const command = config.commandMapping[room + ':' + station].on
    this.client.write(command)
  }

  off (room, station) {
    const command = config.commandMapping[room + ':' + station].off
    this.client.write(command)
  }
}

module.exports = new Light(config.dmx.host, config.dmx.port)
