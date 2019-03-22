module.exports = async (ctx, next) => {
  const session = this.session

  try {
    session.set('hasEnded', true)
    await session.save()

    this.status = 200
  } catch (error) {
    this.body = { error: error.message }
    this.status = 404
  }
}
