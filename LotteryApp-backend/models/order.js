import mongoose from 'mongoose'

const selectionSchema = new mongoose.Schema({
  countryCode: { type: String, required: true },
  number: { type: Number, required: true }
}, { _id: false })

const ticketSchema = new mongoose.Schema({
  selections: { type: [selectionSchema], required: true },
  price: { type: Number, required: true }
}, { _id: false })

const orderSchema = new mongoose.Schema({
  tickets: { type: [ticketSchema], required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
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
