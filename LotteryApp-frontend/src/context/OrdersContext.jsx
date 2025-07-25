import { createContext, useContext, useEffect, useState } from 'react'
import { getOrders } from '../services/ordersService'
import { useAuth } from './AuthContext'

// Create the context
const OrdersContext = createContext()

// Provider component
export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getAllOrders()
  }, [])

  const getAllOrders = async () => {
    try {
      setLoading(true)
      const tokenData = localStorage.getItem('loggedLotteryappUser')
      const token = tokenData ? JSON.parse(tokenData)?.token : null // Parse token if stored as JSON
      if (!token) {
        console.error('No valid token found in localStorage')
        setOrders([])
        setLoading(false)
        return
      }
      console.log('Parsed token from context:', token)
      const res = await getOrders(token) // Pass the token to the service
      console.log('Full response:', res)

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
    <OrdersContext.Provider value={{ orders, loading, getAllOrders }}>
      {children}
    </OrdersContext.Provider>
  )
}

// Custom hook for easy access
export const useOrders = () => useContext(OrdersContext)
