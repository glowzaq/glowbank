import express from 'express'
import { getData } from '../controllers/transactionController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/dashboard-info', protect, getData)

export default router