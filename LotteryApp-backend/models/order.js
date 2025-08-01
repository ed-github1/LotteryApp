import mongoose from 'mongoose'

const selectionSchema = new mongoose.Schema({
  selections: { type: Map, of: Number, required: true } // Use a Map to store country codes as keys and numbers as values
}, { _id: false })

const ticketSchema = new mongoose.Schema({
  selections: { type: Map, of: Number, required: true }, // Store country codes and numbers as a Map
  price: { type: Number, required: true }, // Add price if needed
  drawDate: { type: Map, of: Date, required: true } // Map of country codes to draw dates
}, { _id: false })

const orderSchema = new mongoose.Schema({
  tickets: { type: [ticketSchema], required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now }
})

orderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Order = mongoose.model('Order', orderSchema)

export default Order
