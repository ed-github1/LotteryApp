import { SECRET } from './config.js '
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const errorHandler = (error, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'malformatted id' })
  } else if (error.name === 'validation error') {
    return res.status(400).json({ error: error.message })
  } else if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error')
  ) {
    return res.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'jsonWebTokenError') {
    return res.status(401).json({ error: 'invalid  token' })
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'token expired' })
  }
}

export const unkkwonEndpoint = (req, res) => {
  return res.status(404).send({ error: 'Unknown Endpoint' })
}

export const tokenExtractor = (req, res, next) => {
  const authorization = req.get('Authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7) // Extract the token
  } else {
    req.token = null // No token provided
  }
  next()
}

export const userExtractor = async (req, res, next) => {
  try {
    if (!req.token) {
      return res.status(401).json({ error: 'Token missing or invalid' })
    }

    const decodedToken = jwt.verify(req.token, SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'Token invalid' })
    }

    const user = await User.findById(decodedToken.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    req.user = user // Attach the user to the request object
    next()
  } catch (error) {
    console.error(error.message)
    res.status(400).json({ error: 'Something went wrong' })
  }
}

export const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'access denied ' })
  }
  next()
}
