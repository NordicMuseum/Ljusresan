module.exports = function * (next) {
  if (this.session) {
    this.response.body = this.session.get('stations')

    this.response.status = 200
  } else {
    this.response.status = 404
  }
}
