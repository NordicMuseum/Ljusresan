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
    1: {
      1: {T: '01', P: '05', D: '01'}
    },

    2: {
      2: {T: '02', P: '09', D: '01'},
      3: {T: '02', P: '11', D: '01'},
      4: {T: '02', P: '12', D: '01'}
    },

    3: {
      5: {T: '03', P: '10', D: '01'},
      6: {T: '03', P: '08', D: '01'},
      7: {T: '03', P: '02', D: '02'},
      8: {T: '03', P: '02', D: '03'},
      9: {T: '03', P: '02', D: '02'},
      10: {T: '03', P: '02', D: '04'}
    },

    4: {
      11: {T: '04', P: '09', D: '01'},
      12: {T: '04', P: '08', D: '01'},
      13: {T: '04', P: '08', D: '02'},
      14: {T: '04', P: '08', D: '03'},
      15: {T: '04', P: '08', D: '04'},
      16: {T: '04', P: '08', D: '05'},
      17: {T: '04', P: '08', D: '06'},
      18: {T: '04', P: '08', D: '07'}
    },

    5: {
      19: {T: '05', P: '08', D: '01'},
      20: {T: '05', P: '05', D: '01'},
      21: {T: '05', P: '05', D: '02'},
      22: {T: '05', P: '05', D: '03'},
      23: {T: '05', P: '05', D: '04'},
      24: {T: '05', P: '05', D: '05'}
    },

    6: {
      27: {on: null, off: null}
    }
}
