const Model = require('mongorito').Model

module.exports = class Session extends Model {
  collection () {
    return 'sessions'
  }
}
