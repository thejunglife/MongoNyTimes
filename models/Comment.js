module.exports = (model, Schema) => {
  const Comment = new Schema({
    notes: String,
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Article'
    }
  })

  return model('Comment', Comment)
}
