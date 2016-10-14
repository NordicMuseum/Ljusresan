/**
 * Usage: node telnet-server.js
 */

const net = require('net')

const HOST = '10.0.1.137'
const PORT = 6969

net.createServer(sock => {
  console.log(sock.remoteAddress +':'+ sock.remotePort + ' connected...\n')

  sock.on('data', function (data) {
      console.log(sock.remoteAddress + ': ' + data)
      sock.write('echo: ' + data)

  })

  sock.on('close', data => {
      console.log(sock.remoteAddress +' '+ sock.remotePort + ' disconnected...')
  })
})

.listen(PORT, HOST)

console.log('Server listening on ' + HOST +':'+ PORT)
