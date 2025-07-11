import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema({
  number: Number,
  user: mongoose.Schema.types.ObjectId,
  ref: 'User',
  required: true
})

ticketSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Ticket = mongoose.model('Ticket', ticketSchema)

export default Ticket
