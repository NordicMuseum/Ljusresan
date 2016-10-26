module.exports = {
  database: {
    host: process.env.DATABASE_HOST
  },

  koa: {
    port: process.env.KOA_PORT
  },

  dmx: {
    host: process.env.DMX_HOST,
    port: process.env.DMX_PORT,
    timeout: process.env.DMX_TIMEOUT
  },

  commandMapping: {
    1: [
      {id: 2, T: '01', P: '05', D: '01'}
    ],

    2: [
      {id: 3, T: '02', P: '09', D: '01'},
      {id: 4, T: '02', P: '11', D: '01'},
      {id: 5, T: '02', P: '12', D: '01'}
    ],

    3: [
      {id: 6, T: '03', P: '10', D: '01'},
      {id: 7, T: '03', P: '08', D: '01'},
      {id: 9, T: '03', P: '08', D: '03'},
      {id: 10, T: '03', P: '08', D: '02'},
      {id: 11, T: '03', P: '08', D: '04'}
    ],

    4: [
      {id: 12, T: '04', P: '09', D: '01'},
      {id: 13, T: '04', P: '08', D: '01'},
      {id: 14, T: '04', P: '08', D: '02'},
      {id: 15, T: '04', P: '08', D: '03'},
      {id: 16, T: '04', P: '08', D: '04'},
      {id: 17, T: '04', P: '08', D: '05'},
      {id: 18, T: '04', P: '08', D: '06'},
      {id: 19, T: '04', P: '08', D: '07', onWhen: [12, 13, 14, 15, 16, 17, 18]}
    ],

    5: [
      {id: 20, T: '05', P: '08', D: '01'},
      {id: 21, T: '05', P: '05', D: '01'},
      {id: 22, T: '05', P: '05', D: '02'},
      {id: 23, T: '05', P: '05', D: '03'},
      {id: 24, T: '05', P: '05', D: '04'},
      {id: 25, T: '05', P: '05', D: '05'}
    ],

    6: [
      {id: 26}
    ]
  }
}
