module.exports = {
  database: {
    host: process.env.DATABASE_HOST
  },

  koa: {
    port: process.env.KOA_PORT
  },

  dmx: {
    host: process.env.DMX_HOST,
    port: process.env.DMX_PORT
  }
}
