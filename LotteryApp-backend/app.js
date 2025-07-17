import express from 'express'
import morgan from 'morgan'
import authRouter from './controllers/auth.js'
import connectToDatabase from './utils/db.js'
import cors from 'cors'
import usersRouter from './controllers/users.js'
import ordersRouter from './controllers/order.js'
const app = express()
connectToDatabase()
app.use(express.json())
app.use(morgan('dev'))

//
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/orders', ordersRouter)

export default app
// This is the main application file for the Lottery App backend.
// It sets up the Express server, middleware, and a basic route.
