module.exports = (model, Schema) => {
  const Article = new Schema({
    heading: String,
    summary: String,
    url: String,
    isSaved: {
      type: Boolean,
      default: false
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
  })

  return model('Article', Article)
}
