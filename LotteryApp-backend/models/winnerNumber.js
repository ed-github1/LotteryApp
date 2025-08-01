import mongoose from 'mongoose';

const winnerNumberSchema = new mongoose.Schema({
  countryCode: {
    type: String,
    required: true
  },
  drawDate: {
    type: Date,
    required: true
  },
  winnerNumber: {
    type: Number,
    required: true
  }
});

const WinnerNumber = mongoose.model('WinnerNumber', winnerNumberSchema);

export default WinnerNumber;
