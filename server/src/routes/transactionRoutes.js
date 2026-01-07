import express from 'express'
import { getData, transferMoney } from '../controllers/transactionController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/dashboard-info', protect, getData)
router.post('/transfer', protect, transferMoney)

export default router