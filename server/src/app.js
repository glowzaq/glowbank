import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import protectedRoutes from './routes/protectedRoutes.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes)
app.use('/api/auth', protectedRoutes)

export default app