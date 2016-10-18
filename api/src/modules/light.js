const config = require('../config')
const net = require('net')

module.exports = class Light {
  constructor () {
    const {host, port} = config.services.dmx
    this.client = net.createConnection(port, host)
  }

  turnOn (command) {
    this.client.write(command)
  }

  close () {
    this.client.end()
  }
}
