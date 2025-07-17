import { createContext, useContext, useState, useEffect } from 'react'
import { registerUser, logIn } from '../services/authService'

// Create the context
const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be within on AuthProvider')
  }
  return context
}

// Provider component
export const AuthProvider = ({ children }) => {
  const [authErrors, setAuthErrors] = useState([])
  const [message, setMessage] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedLotteryappUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [])

  const createUser = async (data) => {
    try {
      const res = await registerUser(data)
      setMessage(res.message)
      setAuthErrors([]) // clear errors on success
    } catch (err) {
      // Try to get error message from backend response
      const backendMsg =
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        'Registration failed'
      setAuthErrors([backendMsg])
      setMessage('')
    }
  }

  const login = async (credentials) => {
    try {
      const userData = await logIn(credentials) // Await the async call
      console.log('login called with:', credentials)

      setUser(userData)
      window.localStorage.setItem(
        'loggedLotteryappUser',
        JSON.stringify(userData)
      )
      setAuthErrors([])
    } catch (error) {
      const backendMsg =
        error.response?.data?.error ||
        error.message ||
        'Login failed. Please try again.'
      setAuthErrors([backendMsg])
    }
  }

  const logout = () => {
    setUser(null)
    setAuthErrors([])
    setMessage('')
    window.localStorage.removeItem('loggedLotteryappUser')
  }

  useEffect(() => {
    if (authErrors.length > 0) {
      const timer = setTimeout(() => {
        setAuthErrors([])
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [authErrors])

  return (
    <AuthContext.Provider
      value={{ createUser, user, login, logout, authErrors, message }}
    >
      {children}
    </AuthContext.Provider>
  )
}
