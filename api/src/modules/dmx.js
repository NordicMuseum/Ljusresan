const config = require('../config')
const reconnect = require('net-socket-reconnect')

class DMX {
  constructor (host, port) {
    this.client = reconnect({
      port,
      host,
      reconnectOnTimeout: true,
      reconnectOnCreate: true,
      reconnectInterval: 60000,
      reconnectTimes: 1440
    })

    this.client.on('error', error => {
      console.log('[DMX ERROR]', error.code)
    })

    this.client.on('end', () => {
      console.log('[DMX INFO] disconnected from server')
    })
  }

  on (idRoom, idStation, timeout = config.dmx.timeout) {
    const {T, P, D} = config.commandMapping[idRoom].find(station => {
      return station.id === idStation
    })

    if (T && P && D) {
      this.client.write(`>_T${T}_P${P}_D${D}_ON_<`)

      if (timeout > 0) {
        setTimeout(() => { this.off(idRoom, idStation) }, timeout)
      }
    }
  }

  off (idRoom, idStation) {
    const {T, P, D} = config.commandMapping[idRoom].find(station => {
      return station.id === idStation
    })

    if (T && P && D) {
      this.client.write(`>_T${T}_P${P}_D${D}_OFF_<`)
    }
  }
}

module.exports = new DMX(config.dmx.host, config.dmx.port)
