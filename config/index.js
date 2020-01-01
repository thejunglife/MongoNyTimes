module.exports = require('mongoose').connect('mongodb://localhost/nyarticledb', {
  // these methods are rarely used
  useCreateIndex: true,
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
