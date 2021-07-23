
import { Router } from 'express'

const router = Router()

// Test route
router.use('/test', (req, res) => {
  res.end('Test APasjniudI!')
})

module.exports = router
