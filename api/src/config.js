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
  },

  commandMapping: {
    '1:1': {on: '>_T01_P05_D01_ON_<', off: '>_T01_P05_D01_OFF_<'},

    '2:2': {on: '>_T02_P09_D01_ON_<', off: '>_T02_P09_D01_OFF_<'},
    '2:3': {on: '>_T02_P11_D01_ON_<', off: '>_T02_P11_D01_OFF_<'},
    '2:4': {on: '>_T02_P12_D01_ON_<', off: '>_T02_P12_D01_OFF_<'},

    '3:5': {on: '>_T03_P10_D01_ON_<', off: '>_T03_P10_D01_OFF_<'},
    '3:6': {on: '>_T03_P08_D01_ON_<', off: '>_T03_P08_D01_OFF_<'},
    '3:7': {on: '>_T03_P02_D02_ON_<', off: '>_T03_P02_D02_OFF_<'},
    '3:8': {on: '>_T03_P02_D03_ON_<', off: '>_T03_P02_D03_OFF_<'},
    '3:9': {on: '>_T03_P02_D02_ON_<', off: '>_T03_P02_D02_OFF_<'},
    '3:10': {on: '>_T03_P02_D04_ON_<', off: '>_T03_P02_D04_OFF_<'},

    '4:11': {on: '>_T04_P09_D01_ON_<', off: '>_T04_P09_D01_OFF_<'},
    '4:12': {on: '>_T04_P08_D01_ON_<', off: '>_T04_P08_D01_OFF_<'},
    '4:13': {on: '>_T04_P08_D02_ON_<', off: '>_T04_P08_D02_OFF_<'},
    '4:14': {on: '>_T04_P08_D03_ON_<', off: '>_T04_P08_D03_OFF_<'},
    '3:15': {on: '>_T04_P08_D04_ON_<', off: '>_T04_P08_D04_OFF_<'},
    '3:16': {on: '>_T04_P08_D05_ON_<', off: '>_T04_P08_D05_OFF_<'},
    '3:17': {on: '>_T04_P08_D06_ON_<', off: '>_T04_P08_D06_OFF_<'},
    '3:18': {on: '>_T04_P08_D07_ON_<', off: '>_T04_P08_D07_OFF_<'},

    '5:19': {on: '>_T05_P08_D01_ON_<', off: '>_T05_P08_D01_OFF_<'},
    '5:20': {on: '>_T05_P05_D01_ON_<', off: '>_T05_P05_D01_OFF_<'},
    '5:21': {on: '>_T05_P05_D02_ON_<', off: '>_T05_P05_D02_OFF_<'},
    '5:22': {on: '>_T05_P05_D03_ON_<', off: '>_T05_P05_D03_OFF_<'},
    '5:23': {on: '>_T05_P05_D04_ON_<', off: '>_T05_P05_D04_OFF_<'},
    '5:24': {on: '>_T05_P05_D05_ON_<', off: '>_T05_P05_D05_OFF_<'},

    /**
     * Reset ipad signal */
    '6:27': {on: null, off: null}
  }
}
