const production = process.env.NODE_ENV === 'production'

module.exports = {
  database: {
    host: process.env.DATABASE_HOST
  },

  koa: {
    port: process.env.PORT
  },

  services: {
    dmx: {
      host: production ? '10.0.1.12' : 'telnet',
      port: production ? 3000 : 5000,
      desc: 'Telnet test host. Only usable within the docker setup.'
    }
  }
}
