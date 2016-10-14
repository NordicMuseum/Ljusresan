const net = require('net')

module.exports = class Light {
  constructor (host, port) {
    this.client = net.createConnection(port, host)
  }

  on (id) {
    this.client.write(id); return this
  }

  close () {
    this.client.end()
  }
}
