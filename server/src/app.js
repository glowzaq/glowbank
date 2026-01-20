import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import protectedRoutes from './routes/protectedRoutes.js'
import { generalLimiter } from './middleware/rateLimit.js'
import transactionRoutes from './routes/transactionRoutes.js'

const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api', generalLimiter)
app.use('/api/auth', authRoutes)
app.use('/api/auth', protectedRoutes)
app.use('/api/transaction', transactionRoutes)

export default app