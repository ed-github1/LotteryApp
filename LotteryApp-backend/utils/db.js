import mongoose from 'mongoose'
import { MONGODB_URI } from './config.js'

mongoose.set('strictQuery', false)

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Conectado a MongoDB')
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message)
    process.exit(1)
  }
}

export default connectToDatabase
