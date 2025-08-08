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


  const fetchDrawDates = async () => {
    try {
      const drawData = await getDrawSchedule()
      console.log('draws schedules', drawData);
      // Transform: { IT: { day, hour, minute }, ... } => [{ countryCode, drawDate }, ...]
      const now = new Date();
      const drawDatesArr = Object.entries(drawData).map(([countryCode, { day, hour, minute }]) => {
        // Find next occurrence of this weekday (1=Monday, 7=Sunday)
        // JS: 0=Sunday, 1=Monday, ..., 6=Saturday
        let targetDay = day;
        if (targetDay === 7) targetDay = 0; // Map 7 (Sunday) to 0
        const result = new Date(now);
        const currentDay = result.getDay();
        let daysToAdd = targetDay - currentDay;
        // If today is the draw day but time has passed, or if draw day is before today, go to next week
        if (daysToAdd < 0 || (daysToAdd === 0 && (result.getHours() > hour || (result.getHours() === hour && result.getMinutes() >= minute)))) {
          daysToAdd += 7;
        }
        result.setDate(result.getDate() + daysToAdd);
        result.setHours(hour, minute, 0, 0);
        return { countryCode, drawDate: result.toISOString(), local: result.toLocaleString() };
      });
      // Debug: log all draw dates with local time
      console.log('All calculated draw dates:', drawDatesArr);
      // Find the absolute soonest future draw
      const soonestDraw = drawDatesArr.reduce((min, curr) => {
        return new Date(curr.drawDate) < new Date(min.drawDate) ? curr : min;
      }, drawDatesArr[0]);
      console.log('Soonest draw:', soonestDraw);
      setDrawDates(drawDatesArr);
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
