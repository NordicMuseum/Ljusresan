module.exports = function * (next) {
  const session = this.session

  try {
    session.set('hasEnded', true)
    yield session.save()

    this.status = 200
  } catch (error) {
    this.body = { error: error.message }
    this.status = 404
  }
}
