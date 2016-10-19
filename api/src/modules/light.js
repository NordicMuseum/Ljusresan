const config = require('../config')
const net = require('net')

class Light {
  constructor (host, port) {
    this.client = net.createConnection(port, host)
  }

  on (room, station) {
    const key = (room + ':' + station)
    const command = config.commandMapping[key].on
    this.client.write(command)
  }

  off (room, station) {
    const key = (room + ':' + station)
    const command = config.commandMapping[key].off
    this.client.write(command)
  }
}

module.exports = new Light(config.dmx.host, config.dmx.port)
