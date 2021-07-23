import express from 'express'
const app = express()
// Create express instance

// Require API routes
// const users = require('./routes/users')
const test = require('./routes/test')

// Import API Routes
// app.use(users)
app.use(test)

// Export express app
module.exports = app

