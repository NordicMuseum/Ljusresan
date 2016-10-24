module.exports = function * (next) {
  if (this.session) {
    this.response.body = {
      stations: this.session.get('stations')
    }

    this.response.status = 204
  } else {
    this.response.status = 404
  }
}
