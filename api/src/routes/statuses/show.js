module.exports = function * (next) {
  if (this.session) {
    this.response.body = this.session
    this.response.status = 200
  } else {
    this.response.status = 404
  }
}
