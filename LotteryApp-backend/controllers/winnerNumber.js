import express from 'express'
import WinnerNumber from '../models/winnerNumber.js'; // Import the WinnerNumber model

const winnerNumberRouter = express.Router()


winnerNumberRouter.post('/upload', async (req, res) => {
  const { countryCode, drawDate, winnerNumber } = req.body;

  try {
    if (!countryCode || !drawDate || typeof winnerNumber !== 'number') {
      return res.status(400).json({ message: 'Invalid data provided.' });
    }

    // Upsert the winner number for a specific country and draw date
    const updatedWinnerNumber = await WinnerNumber.findOneAndUpdate(
      { countryCode, drawDate },
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
winnerNumberRouter.post('/check-winners', async (req, res) => {
  const { countryCode, drawDate } = req.body;
  if (!countryCode || !drawDate) {
    return res.status(400).json({ message: 'countryCode and drawDate are required.' });
  }
  try {
    // Find the winning number for this country and draw date
    const winnerEntry = await WinnerNumber.findOne({ countryCode, drawDate });
    if (!winnerEntry) {
      return res.status(404).json({ message: 'No winning number found for this draw.' });
    }
    // Find all orders with tickets for this draw and country
    const Order = (await import('../models/order.js')).default;
    const query = {};
    query[`tickets.drawDate.${countryCode}`] = new Date(drawDate);
    const orders = await Order.find(query);
    // Collect winners
    const winners = [];
    orders.forEach(order => {
      order.tickets.forEach(ticket => {
        if (
          ticket.drawDate &&
          ticket.drawDate[countryCode] &&
          new Date(ticket.drawDate[countryCode]).getTime() === new Date(drawDate).getTime() &&
          ticket.selections &&
          ticket.selections[countryCode] === winnerEntry.winnerNumber
        ) {
          winners.push({
            user: order.user,
            ticketId: ticket._id,
            selection: ticket.selections[countryCode],
            orderId: order._id
          });
        }
      });
    });
    res.json({ winners, winningNumber: winnerEntry.winnerNumber });
  } catch (error) {
    console.error('Error checking winners:', error);
    res.status(500).json({ message: 'Error checking winners', error: error.message });
  }
});

export default winnerNumberRouter