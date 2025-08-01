import { createContext, useContext, useEffect, useState } from 'react'
import { getDrawSchedule, getOrders } from '../services/ordersService'
import { useAuth } from './AuthContext'

// Create the context
const OrdersContext = createContext()

// Provider component
export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [drawDates, setDrawDates] = useState([])

  useEffect(() => {
    getAllOrders()
    fetchDrawDates()
  }, [])

  console.log('oders from context', orders);

  const fetchDrawDates = async () => {
    try {
      const drawData = await getDrawSchedule()
      setDrawDates(drawData)
    } catch (error) {
      console.error('Error fetching draw dates:', error)
      setDrawDates([])
    }
  }

  const getAllOrders = async () => {
    try {
      setLoading(true)
      const tokenData = localStorage.getItem('loggedLotteryappUser')
      const token = tokenData ? JSON.parse(tokenData)?.token : null // Parse token if stored as JSON
      if (!token) {
        console.error('')
        setOrders([])
        setLoading(false)
        return
      }


      const res = await getOrders(token) // Pass the token to the service

      // Check if the response contains an `orders` property
      if (res && Array.isArray(res.orders)) {
        setOrders(res.orders) // Set the orders array directly
      } else {
        console.warn('Unexpected response structure:', res)
        setOrders([]) // Default to an empty array
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      setOrders([]) // Default to an empty array on error
    } finally {
      setLoading(false)
    }

  }



  return (
    <OrdersContext.Provider value={{ orders, loading, getAllOrders, drawDates }}>
      {children}
    </OrdersContext.Provider>
  )
}

export const useOrders = () => useContext(OrdersContext)
