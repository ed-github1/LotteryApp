import axios from 'axios'

const baseUrl = '/api/orders'

export const sendOrder = async (order) => {
  const res = await axios.post(baseUrl, order)
  return res.data
}


