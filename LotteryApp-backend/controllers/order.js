import express from 'express'
import Order from '../models/order.js'
import { tokenExtractor, adminOnly } from '../utils/middleware.js'

const ordersRouter = express.Router()

const PRICE_PER_SELECTION = 0.4

const countryDrawSchedules = {
  IT: { day: 5, hour: 19, minute: 0 }, // Friday 19:00 GMT
  CA: { day: 5, hour: 18, minute: 50 }, // Saturday 02:00 GMT
  MX: { day: 6, hour: 3, minute: 15 }, // Saturday 03:15 GMT
  NZ: { day: 6, hour: 8, minute: 0 }, // Saturday 08:00  GMT
  KR: { day: 6, hour: 11, minute: 40 }, //  Saturday: 11:40  GMT
  IE: { day: 6, hour: 18, minute: 55 }, // Saturday 18:55  GMT
  UK: { day: 6, hour: 20, minute: 0 }, // Saturday 20:55  GMT
  FR: { day: 7, hour: 20, minute: 0 }
  // Add more countries
}

const getNextDrawDateForCountry = (countryCode, now = new Date()) => {
  const schedule = countryDrawSchedules[countryCode]
  if (!schedule) throw new Error('Unknown country code')

  // Find this week's draw
  const result = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      schedule.hour,
      schedule.minute,
      0,
      0
    )
  )
  // Set to the correct weekday
  result.setUTCDate(
    now.getUTCDate() + ((schedule.day + 7 - now.getUTCDay()) % 7)
  )

  // If now is after this week's draw, move to next week's draw
  if (now >= result) {
    result.setUTCDate(result.getUTCDate() + 7)
  }
  return result
}

// Orders by user
ordersRouter.get('/', tokenExtractor, async (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 10
    const skip = (page - 1) * limit

    // Filter orders by the user ID extracted from the token
    const orders = await Order.find({ user: req.userId })
      .populate('user')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    // Get total count for pagination info
    const totalOrders = await Order.countDocuments({ user: req.userId })

    return res.status(200).json({
      orders,
      page,
      limit,
      totalOrders,
      totalPages: Math.ceil(totalOrders / limit)
    })
  } catch (error) {
    console.error('Error fetching user orders:', error)
    return res
      .status(500)
      .json({ message: 'Error fetching orders', error: error.message })
  }
})

// all orders with pagination for admin
ordersRouter.get('/all', tokenExtractor, adminOnly, async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 10
    const skip = (page - 1) * limit

    const orders = await Order.find({})
      .populate('user')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const totalOrders = await Order.countDocuments({})

    return res.status(200).json({
      orders,
      page,
      limit,
      totalOrders,
      totalPages: Math.ceil(totalOrders / limit)
    })
  } catch (error) {
    console.error('Error fetching all orders:', error)
    return res
      .status(500)
      .json({ message: 'Error fetching all orders', error: error.message })
  }
})

// Post order
ordersRouter.post('/', tokenExtractor, async (req, res) => {
  const { tickets } = req.body
  try {
    if (!Array.isArray(tickets) || !req.userId) {
      return res.status(400).json({ message: 'Invalid order data.' })
    }

    // Calculate ticket prices and total price in backend
    const formattedTickets = tickets.map((ticket) => {
      const numSelections = Object.keys(ticket.selections).filter(
        (key) => key !== '➕'
      ).length

      const price = numSelections * PRICE_PER_SELECTION

      const drawDates = {}
      for (const countryCode of Object.keys(ticket.selections)) {
        if (countryCode === '➕') continue
        drawDates[countryCode] = getNextDrawDateForCountry(countryCode)
      }

      return {
        selections: ticket.selections,
        price,
        drawDate: drawDates
      }
    })

    const total = formattedTickets.reduce(
      (sum, ticket) => sum + ticket.price,
      0
    )

    const order = new Order({
      tickets: formattedTickets,
      total,
      user: req.userId
    })

    await order.save()
    const populatedOrder = await Order.findById(order._id).populate('user')

    // Send purchase confirmation email
    try {
      // Import nodemailer and config if not already
      const nodemailer = (await import('nodemailer')).default
      const { EMAIL_USER } = await import('../utils/config.js')
      // Use the same transporter as in auth.js
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      })

      // Build order details for email
      const ticketDetails = populatedOrder.tickets
        .map((ticket, idx) => {
          return `<li>Ticket #${idx + 1}:<br>
          Selections: ${JSON.stringify(ticket.selections)}<br>
          Price: $${ticket.price.toFixed(2)}<br>
          Draw Dates: ${Object.entries(ticket.drawDate)
            .map(([cc, date]) => `${cc}: ${new Date(date).toLocaleString()}`)
            .join(', ')}
        </li>`
        })
        .join('')

      const emailHTML = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f4f4f4;">
          <h2 style="color: #333;">Gracias por tu compra en LotteryApp 🎟️</h2>
          <p>Detalles de tu orden:</p>
          <ul>${ticketDetails}</ul>
          <p><strong>Total pagado:</strong> $${populatedOrder.total.toFixed(
            2
          )}</p>
        </div>
      `

      await transporter.sendMail({
        from: EMAIL_USER,
        to: populatedOrder.user.email,
        subject: 'Confirmación de compra - LotteryApp',
        html: emailHTML
      })
    } catch (emailError) {
      console.error('Error sending purchase confirmation email:', emailError)
      // Optionally, you can notify the client of email failure, but still return the order
    }

    res.status(201).json(populatedOrder)
  } catch (error) {
    console.error('Error creating order:', error)
    res
      .status(500)
      .json({ message: 'Error creating order', error: error.message })
  }
})

// get draw schedules
ordersRouter.get('/draw-schedules', (req, res) => {
  res.status(200).json(countryDrawSchedules)
})

export default ordersRouter
