import express from 'express'
import Order from '../models/order.js'
import { tokenExtractor } from '../utils/middleware.js'

const ordersRouter = express.Router()
 
ordersRouter.get('/',tokenExtractor, async (req, res) => {
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
    const formattedTickets = tickets.map((ticket) => ({
      selections: ticket.selections, // Correctly map the selections field
      price: ticket.price // Use the price from the payload
    }))

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

export default ordersRouter
