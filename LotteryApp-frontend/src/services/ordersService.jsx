import axios from 'axios'

// const baseUrl = '/api/orders'
const baseUrl = `/api/orders`;



export const getOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const res = await axios.get(baseUrl, config);
  return res.data;
};

export const sendOrder = async (order, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}` // Include token in Authorization header
    }
  };

  const res = await axios.post(baseUrl, order, config);
  return res.data;
};


export const getDrawSchedule = async () => {
  const res = await axios.get(`${baseUrl}/draw-schedules`)
  return res.data
}