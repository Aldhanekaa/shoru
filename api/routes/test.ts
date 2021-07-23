
import { Router } from 'express'

const router = Router()

// Test route
// @ts-ignore
router.use('/test', (req, res) => {
  res.end('Test APasjniudI!')
})

export default router
