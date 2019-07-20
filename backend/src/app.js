const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

const isProduction = process.env.NODE_ENV === 'production'

// Requiring in models (before routers)
const customerModel = require('./models/Customer')

// Requiring in routers
const router = require('./routes')

// Create global app object
const app = express()

// Setting security headers

// Setup CORS
app.use(cors())

// Adding middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Adding server routers
app.use('/', router)

// Connect to db first before starting server
const options = { useNewUrlParser: true }
if (isProduction) {
  mongoose.connect(process.env.MONGODB_URI, options)
  mongoose.set('useCreateIndex', true)
} else {
  mongoose
    .connect(process.env.MONGODB_TEST_URI, options)
    .then(() => console.log('Mongodb connection established :)'))
    .catch(err => console.error(`Mongodb failure: ${err.message}`))
  mongoose.set('useCreateIndex', true)
  mongoose.set('debug', true)
}

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Development error handler will print stacktrace
if (!isProduction) {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
      errors: {
        error: err,
        message: err.message,
      },
    })
  })
}

// Production error handler - no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    errors: {
      error: {},
      message: err.message,
    },
  })
})

// Finally, let's start our server...
const server = app.listen(process.env.PORT || 3001, () => {
  console.log('Listening on port ' + server.address().port)
})
