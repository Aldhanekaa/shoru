import express from 'express'
import test from './routes/test'

const app = express()
// Create express instance

// Require API routes
// const users = require('./routes/users')

// Import API Routes
// app.use(users)
app.use(test)

// Export express app
export default app


// // Start standalone server if directly running
// if (require.main === module) {
//     const port = process.env.PORT || 3001
//     app.listen(port, () => {
//       // eslint-disable-next-line no-console
//       console.log(`API server listening on port ${port}`)
//     })
//   }
  