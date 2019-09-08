// Check to see if this is in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Dependencies
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

// Routes #1
const indexRouter = require('./routes/index')
const authourRouter = require('./routes/authours')

// Define what makes the server serve directouries
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

// Connect to database
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

// Define the route's folders #2
app.use('/', indexRouter)
app.use('/authours', authourRouter)

// Start the server
app.listen(process.env.PORT || 3000)
