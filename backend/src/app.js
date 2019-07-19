const express = require('express')
const mongoose = require('mongoose')

// Requiring in models (before routers)

// Requiring in routers

// Create global app object
const app = express()

// Setting security headers

// Setup CORS

// Adding middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Adding server routers

// Connect to db first before starting server

// Catch 404 and forward to error handler

// Development error handler will print stacktrace

// Finally, let's start our server...
const server = app.listen(process.env.PORT || 3001, () => {
  console.log('Listening on port ' + server.address().port)
})
