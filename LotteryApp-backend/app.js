import express from 'express'
import morgan from 'morgan'
import authRouter from './controllers/auth.js'
import connectToDatabase from './utils/db.js'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import usersRouter from './controllers/users.js'
import ordersRouter from './controllers/order.js'
import winnerNumberRouter from './controllers/winnerNumber.js'
import { PORT } from './utils/config.js';

const app = express()
connectToDatabase()
app.use(express.json())
app.use(morgan('dev'))

//// Configuración del rate limiter: limita a 100 peticiones por 15 minutos
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5000, // Limita a 100 peticiones
  message: 'Demasiadas peticiones, por favor inténtalo de nuevo más tarde.'
});

// Aplicar el rate limiter globalmente
app.use(limiter);
app.use(helmet());

app.use(
  cors({
    origin: '*',
    credentials: true
  })
)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/winner-number', winnerNumberRouter)

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

export default app
// This is the main application file for the Lottery App backend.
// It sets up the Express server, middleware, and a basic route.
