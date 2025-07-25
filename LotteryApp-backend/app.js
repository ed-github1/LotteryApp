import express from 'express'
import morgan from 'morgan'
import authRouter from './controllers/auth.js'
import connectToDatabase from './utils/db.js'
import cors from 'cors'
import usersRouter from './controllers/users.js'
import ordersRouter from './controllers/order.js'
import winnerNumberRouter from './controllers/winnerNumber.js'
const app = express()
connectToDatabase()
app.use(express.json())
app.use(morgan('dev'))

//
app.use(
  cors({
    origin: 'https://lotteryappuno.netlify.app',
    credentials: true
  })
)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/winner-number', winnerNumberRouter)
export default app
// This is the main application file for the Lottery App backend.
// It sets up the Express server, middleware, and a basic route.
