const net = require('net')

module.exports = class Light {
  constructor (host, port) {
    this.client = net.createConnection(port, host)
  }

  turnOn (id) {
    this.client.write(id)
  }

  close () {
    this.client.end()
  }
}
