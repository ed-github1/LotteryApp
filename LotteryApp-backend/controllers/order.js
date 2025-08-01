import express from 'express'
import Order from '../models/order.js'
import { tokenExtractor } from '../utils/middleware.js'

const ordersRouter = express.Router()

const countryDrawSchedules = {
  IT: { day: 5, hour: 19, minute: 0 }, // Friday 19:00 GMT
  CA: { day: 6, hour: 2, minute: 0 }, // Saturday 02:00 GMT
  MX: { day: 6, hour: 3, minute: 15 }, // Saturday 03:15 GMT
  NZ: { day: 6, hour: 8, minute: 0 }, // Saturday 08:00  GMT
  KR: { day: 6, hour: 11, minute: 40 }, //  Saturday: 11:40  GMT
  IE: { day: 6, hour: 18, minute: 55 }, // Saturday 18:55  GMT
  UK: { day: 6, hour: 20, minute: 0 }, // Saturday 20:55  GMT
  FR: { day: 7, hour: 20, minute: 0 }
  // Add more countries as needed
}

function getNextDrawDateForCountry(countryCode, now = new Date()) {
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

ordersRouter.get('/', tokenExtractor, async (req, res) => {
  try {
    // Filter orders by the user ID extracted from the token
    const orders = await Order.find({ user: req.userId }).populate('user') // Populate the user field
    return res.status(200).json({ orders })
  } catch (error) {
    console.error('Error fetching user orders:', error)
    return res
      .status(500)
      .json({ message: 'Error fetching orders', error: error.message })
  }
})

ordersRouter.post('/', tokenExtractor, async (req, res) => {
  const { tickets, total } = req.body

  try {
    if (!Array.isArray(tickets) || typeof total !== 'number' || !req.userId) {
      return res.status(400).json({ message: 'Invalid order data.' })
    }

    // Transform tickets to match the schema
    const formattedTickets = tickets.map((ticket) => {
      // For each country in selections, calculate its drawDate
      const drawDates = {}
      for (const countryCode of Object.keys(ticket.selections)) {
        if (countryCode === '➕') continue
        drawDates[countryCode] = getNextDrawDateForCountry(countryCode)
      }
      return {
        selections: ticket.selections,
        price: ticket.price,
        countryCode: undefined, // not needed for this structure
        drawDate: drawDates // store all draw dates for this ticket
      }
    })

    const order = new Order({
      tickets: formattedTickets,
      total,
      user: req.userId
    })

    await order.save()
    const populatedOrder = await Order.findById(order._id).populate('user')
    res.status(201).json(populatedOrder)
  } catch (error) {
    console.error('Error creating order:', error)
    res
      .status(500)
      .json({ message: 'Error creating order', error: error.message })
  }
})

// New endpoint to get draw schedules
ordersRouter.get('/draw-schedules', (req, res) => {
  res.json(countryDrawSchedules)
})

export default ordersRouter
