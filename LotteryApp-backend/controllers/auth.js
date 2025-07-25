import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import User from '../models/user.js'
import { JWT_SECRET, EMAIL_PASS, EMAIL_USER } from '../utils/config.js'
const authRouter = Router()

//Sending email for verification
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
})

// Register user
authRouter.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body

  // Check if email or username already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { username }]
  })
  if (existingUser) {
    return res
      .status(400)
      .json({ message: 'El correo o nombre de usuario ya está registrado.' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  // Save user as pending (not verified)
  const user = new User({
    username,
    email,
    passwordHash,
    role: 'user',
    verified: false
  })
  await user.save()

  // Create verification email token with user id
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: '1d'
  })
  const verificationLink = `http://localhost:5173/verify-email?token=${token}`

  const emailHTML = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f4f4f4;">
    <h2 style="color: #333;">Bienvenido a LotteryApp 👋</h2>
    <p>Gracias por registrarte. Antes de comenzar, necesitamos verificar tu dirección de correo electrónico.</p>
    <p>Haz clic en el botón de abajo para confirmar tu cuenta:</p>
    <p style="text-align: center;">
      <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; background-color: #28a745; color: #fff; text-decoration: none; border-radius: 5px;">
        Verificar mi correo
      </a>
    </p>
  </div>
  `

  await transporter.sendMail({
    from: EMAIL_USER,
    to: email,
    subject: 'Verifica tu correo',
    html: `${emailHTML}`
  })

  res.json({
    message: 'Registro exitoso. Revisa tu correo para verificar tu cuenta.'
  })
})

//verified the token
authRouter.get('/verify-email', async (req, res) => {
  const { token } = req.query
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    const user = await User.findById(decoded.userId)
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }
    if (user.verified) {
      return res.status(200).json({ message: 'Email already verified' })
    }
    user.verified = true
    await user.save()
    return res.status(200).json({ message: 'Email verified' })
  } catch (error) {
    return res.status(400).json({ message: 'Invalid or expired token' })
  }
})

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body
  console.log('Login attempt:', email)

  try {
    const user = await User.findOne({ email })
    console.log('User found:', user)

    if (!user || !user.passwordHash) {
      console.log('User not found or password hash missing')
      return res.status(401).json({ error: 'Wrong Credentials' })
    }

    console.log('Password hash:', user.passwordHash)
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash)
    console.log('Password match:', passwordCorrect)

    if (!passwordCorrect) {
      console.log('Password incorrect')
      return res.status(401).json({ error: 'Wrong Credentials' })
    }

    const userForToken = {
      email: user.email,
      id: user._id
    }

    const token = jwt.sign(userForToken, JWT_SECRET, { expiresIn: '1d' })
    console.log('Generated token:', token)

    res.status(200).send({
      token,
      username: user.username,
      email: user.email,
      role: user.role,
      user: user._id
    })
  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default authRouter
