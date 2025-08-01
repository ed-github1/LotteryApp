import axios from 'axios';

const baseUrl = '/api/winner-number'

export const getWinnerNumber = async () => {
  try {
    const res = await axios.get(`${baseUrl}/display`);
    return res.data;
  } catch (error) {
    console.error('Error in getWinnerNumber:', error);
    throw error;
  }
};


