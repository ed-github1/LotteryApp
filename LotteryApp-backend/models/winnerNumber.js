import mongoose from 'mongoose';

const winnerNumberSchema = new mongoose.Schema({
  countryCode: {
    type: String,
    required: true,
    unique: true, // Ensure each country has only one winner number
  },
  winnerNumber: {
    type: Number,
    required: true,
  },
});

const WinnerNumber = mongoose.model('WinnerNumber', winnerNumberSchema);

export default WinnerNumber;
