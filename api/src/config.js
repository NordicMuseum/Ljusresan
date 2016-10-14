module.exports = {
  database: {
    host: process.env.DATABASE_HOST
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
