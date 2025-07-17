import express from 'express'
import Order from '../models/order.js'

const ordersRouter = express.Router()


ordersRouter.get('/', async(req , res)=>{
    const orders  = await Order.find({})
    return res.status(200).json({orders})
})

ordersRouter.post('/', async (req, res) => {
  console.log('Received body:', req.body) // Debug log
  const { tickets, total, userId } = req.body

  if (!Array.isArray(tickets) || typeof total !== 'number' || !userId) {
    return res.status(400).json({ message: 'Invalid order data.' })
  }

  const order = new Order({
    tickets,
    total,
    userId
  })

  await order.save()
  res.status(201).json(order)
})

export default ordersRouter
