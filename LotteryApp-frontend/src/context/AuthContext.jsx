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
  const [token, setToken] = useState(() => window.localStorage.getItem('loggedLotteryappToken') || null)

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedLotteryappUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    // Sync token from localStorage on mount
    const storedToken = localStorage.getItem('loggedLotteryappToken');
    if (storedToken) {
      setToken(storedToken);
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
      const res = await logIn(credentials) // Await the async call
      setUser(res.user)
      window.localStorage.setItem(
        'loggedLotteryappUser',
        JSON.stringify(res.user)
      )
      // Store token separately
      if (res.token) {
        window.localStorage.setItem('loggedLotteryappToken', res.token);
        setToken(res.token);
      }
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
    window.localStorage.removeItem('loggedLotteryappToken')
    setToken(null)
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
      value={{
        createUser,
        user,
        login,
        logout,
        authErrors,
        message,
        token
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
