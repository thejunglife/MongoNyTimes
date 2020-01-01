require('./config')
const express = require('express')
const { join } = require('path')

const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

require('./routes')(app)

require('mongoose').connection.once('open', () => app.listen(3000))