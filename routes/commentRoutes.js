const { Comment, Article } = require('../models')

module.exports = app => {
  //  GET comments
  app.get('/comments', (req, res) => {
    Comment.find()
      .then(comments => {
        res.json(comments)
      })
      .catch(e => console.error(e))
  })
  // ADD comment
  app.post('/comments', (req, res) => {
    Comment.create(req.body)
      .then(({ _id }) => {
        Article.updateOne(
          {
            _id: req.body.parent
          },
          {
            $push: {
              comments: _id
            }
          }
        )
          .then(() => res.sendStatus(200))
          .catch(e => console.error(e))
      })
      .catch(e => console.error(e))
  })

  // DELETE comment
  app.delete('/comments', (req, res) => {
    Comment.deleteOne({ notes: req.body.notes })
      .then(() => res.sendStatus(200))
      .catch(e => console.error(e))
  })
}
