import express from 'express'
import { depositMoney, getData, transferMoney } from '../controllers/transactionController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/dashboard-info', protect, getData)
router.post('/transfer', protect, transferMoney)
router.post('/deposit', protect, depositMoney)

export default router