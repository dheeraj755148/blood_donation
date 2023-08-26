require('dotenv').config() // Load environment variables from .env file

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./routes')
const morgan = require('morgan')

const mongoose = require('mongoose')

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))

const port = process.env.PORT || 9000

mongoose.connect(process.env.DB_URL_NET, {}, (err) => {
  if (err) {
    console.log(err.message)
    throw err
  }
  console.log(`mongodb server started...`)
})

app.use(routes)

app.listen(port, () => console.log(`Listening at: ${port}`))

module.exports = app
