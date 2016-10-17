module.exports = {
  database: {
    host: process.env.DATABASE_HOST
  },

  koa: {
    port: process.env.PORT
  },

  stations: {
    'telnet': {
      host: 'telnet',
      description: 'Telnet test station'
    },
    'rfid01': {
      host: '192.168.10.2',
      description: 'Skylt rum 1'
    },

    'rfid02': {
      host: '192.168.10.3',
      description: 'Skylt rum 2'
    },

    'rfid03': {
      host: '192.168.10.4',
      description: 'Väsen 1'
    }
  }
}
