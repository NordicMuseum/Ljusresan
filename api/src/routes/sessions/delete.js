module.exports = function * (next) {
  const session = this.session

  try {
    session.set('hasEnded', true)
    yield session.save()
  } catch (error) {
    this.body = {
      message: error.message
    }
    this.status = 500
  }
}
