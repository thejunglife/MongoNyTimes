module.exports = app => {
  require('./articleRoutes.js')(app)
  require('./commentRoutes.js')(app)
}