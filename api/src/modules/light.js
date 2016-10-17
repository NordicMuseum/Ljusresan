const config = require('../config')
const net = require('net')

module.exports = class Light {
  constructor (id) {
    this.id = id

    const {host, port} = config.services.dmx
    this.client = net.createConnection(port, host)
  }

  turnOn () {
    this.client.write(this.id)
  }

  close () {
    this.client.end()
  }
}
