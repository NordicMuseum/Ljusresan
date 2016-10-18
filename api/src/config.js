module.exports = {
  database: {
    host: process.env.DATABASE_HOST
  },

  koa: {
    port: process.env.PORT
  },

  services: {
    dmx: {
      host: process.env.DMX_HOST,
      port: process.env.DMX_PORT,
      desc: 'Telnet test host. Only usable within the docker setup.'
    }
  }
}
