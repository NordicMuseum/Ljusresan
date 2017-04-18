const net = require('net')

const HOST = process.env.HOST
const PORT = process.env.PORT

net.createServer(sock => {
  console.log(sock.remoteAddress +':'+ sock.remotePort + ' connected...')

  sock.on('data', function (data) {
    console.log(sock.remoteAddress + ': ' + data)
    sock.write('echo: ' + data)
  })

  sock.on('close', data => {
    console.log(sock.remoteAddress +':'+ sock.remotePort + ' disconnected...')
  })
})

.listen(PORT, HOST)

console.log('Listening on ' + HOST +':'+ PORT)
