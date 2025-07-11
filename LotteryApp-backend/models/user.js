import mongoose from 'mongoose'

// Esquema del Usuario
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    required: true,
    unique: true,
    type: String
  },
  passwordHash: {
    required: true,
    type: String
  },
  fullName: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // el passwordHash no debe mostrarse
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

export default User
