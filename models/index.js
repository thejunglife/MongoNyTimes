const { model, Schema } = require('mongoose')

const Article = require('./Article.js')(model, Schema)
const Comment = require('./Comment.js')(model, Schema)

module.exports = { Article, Comment }