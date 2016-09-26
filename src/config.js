module.exports = {
  rethinkdb: {
    host: process.env.RETHINKDB_ADDR,
    port: process.env.RETHINKDB_PORT,
    db: 'nordisktljus'
  },

  koa: {
    port: process.env.PORT || 5000
  },

  rooms: [
    {
      name: 'Modern lights',
      desc: 'The room contains an exhebition on modern lighting',
      tags: [
        'nfc-001',
        'nfc-002',
        'nfc-003',
        'nfc-004'
      ]
    }
  ]
}
