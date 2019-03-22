const net = require('net')
const { HOST, PORT } = process.env

;(function () {
  const server = net.createServer((socket) => {
    console.log(socket.remoteAddress + ':' + socket.remotePort + ' connected...')

    socket.on('data', (data) => {
      console.log(socket.remoteAddress + ': ' + data)
      socket.write('echo: ' + data)
    })

    socket.on('close', (data) => {
      console.log(socket.remoteAddress + ':' + socket.remotePort + ' disconnected...')
    })
  })

  server.listen(PORT, HOST)

  console.log('Listening on ' + HOST + ':' + PORT)
})()
