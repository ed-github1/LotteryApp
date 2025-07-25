import express from 'express'
import WinnerNumber from '../models/winnerNumber.js'; // Import the WinnerNumber model

const winnerNumberRouter = express.Router()


winnerNumberRouter.post('/upload', async (req, res) => {
  const { countryCode, winnerNumber } = req.body;

  try {
    if (!countryCode || typeof winnerNumber !== 'number') {
      return res.status(400).json({ message: 'Invalid data provided.' });
    }

    // Upsert the winner number (update if exists, insert if not)
    const updatedWinnerNumber = await WinnerNumber.findOneAndUpdate(
      { countryCode },
      { winnerNumber },
      { new: true, upsert: true }
    );

    return res.status(200).json(updatedWinnerNumber);
  } catch (error) {
    console.error('Error updating winner number:', error);
    return res.status(500).json({ message: 'Error updating winner number', error: error.message });
  }
});

winnerNumberRouter.get('/display', async (req, res) => {
  try {
    // Fetch all winner numbers from the database
    const winnerNumbers = await WinnerNumber.find();

    return res.status(200).json(winnerNumbers);
  } catch (error) {
    console.error('Error fetching winner numbers:', error);
    return res.status(500).json({ message: 'Error fetching winner numbers', error: error.message });
  }
});

export default winnerNumberRouter