import mongoose from 'mongoose'

// Esquema de Wallet (con referencia al usuario)
const walletSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencia al modelo de Usuario
    required: true
  },
  walletAddress: {
    type: String,
    required: true // La dirección de la wallet en Telegram
  },
  balance: {
    type: Number,
    default: 0 // El balance inicial de la wallet
  },
  transactions: [
    {
      txId: {
        type: String,
        required: true // ID de la transacción (puede ser un hash)
      },
      amount: {
        type: Number,
        required: true // Monto de la transacción
      },
      type: {
        type: String,
        enum: ['deposit', 'withdrawal', 'lottery'], // Tipo de transacción
        required: true
      },
      date: {
        type: Date,
        default: Date.now // Fecha de la transacción
      }
    }
  ]
})

const Wallet = mongoose.model('Wallet', walletSchema)

export default Wallet
