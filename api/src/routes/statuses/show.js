module.exports = function * (next) {
  if (!this.session) {
    this.response.status = 404
  }

  if (this.session) {
    this.response.status = 200
    this.response.body = {
      stations: this.session.get('stations')
    }
  }
}
