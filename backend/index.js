import cookieParser from 'cookie-parser'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { connectDB } from './db.js'
import AuthRoutes from './routes/auth.route.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use('/auth', AuthRoutes)

app.listen(PORT, () => {
    console.log('Server ON')
    connectDB()
})