const { Article } = require('../models')
const axios = require('axios')
const cheerio = require('cheerio')
const db = require('mongojs')('nyarticledb')

module.exports = app => {
  // GET all saved articles
  app.get('/savedHtml/savedArticles', (req, res) => {
    Article.find({ isSaved: true })
      .populate('comments')
      .then(articles => {
        res.json(articles)
      })
      .catch(e => console.error(e))
  })
  // GET all articles with refresh
  app.get('/article', (req, res) => {
    Article.find({ isSaved: false })
      .populate('comments')
      .then(articles => {
        res.json(articles)
      })
      .catch(e => console.error(e))
  })
  // GET all articles after SCRAPING articles
  app.get('/articles', (req, res) => {
    axios.get('https://www.npr.org/sections/news/')
      .then(({ data: html }) => {
        const $ = cheerio.load(html)

        $('div.item-info').each((i, el) => {
          const heading = $(el)
            .children('h2')
            .text()
          const summary = $(el)
            .children('p')
            .text()
          const url = $(el)
            .children('h2')
            .children('a')
            .attr('href')
          db.articles.insert({
            heading: heading,
            summary: summary,
            url: url,
            isSaved: false
          })
        })
      })
      .then(() => {
        Article.find({ isSaved: false })
          .populate('comments')
          .then(articles => {
            res.json(articles)
          })
          .catch(e => console.error(e))
      })
      .catch(e => console.error(e))
  })

  // Update article to save
  app.put('/articles/:id', (req, res) => {
    Article.updateOne({ _id: req.params.id }, { isSaved: true })
      .then(() => res.sendStatus(200))
      .catch(e => console.error(e))
  })

  // Delete all articles
  app.delete('/articles', (req, res) => {
    Article.deleteMany()
      .then(() => res.sendStatus(200))
      .catch(e => console.error(e))
  })

  // Delete article form saved
  app.delete('/article/:id', (req, res) => {
    Article.deleteOne({ _id: req.params.id })
        .then(() => res.sendStatus(200))
        .catch(e => console.error(e))
  })
}
