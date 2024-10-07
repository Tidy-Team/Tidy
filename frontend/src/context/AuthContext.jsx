import { createContext, useState, useContext, useEffect } from 'react'
import {
  logoutRequest,
  signInnRequest,
  signUpRequest,
  verifySession,
} from '../api/auth'
import Cookies from 'js-cookie'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (error.length > 0) {
      const timer = setTimeout(() => {
        setError([])
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const signUp = async (user) => {
    try {
      const res = await signUpRequest(user)
      setIsAuthenticated(true)
      setUser(res.data)
      Cookies.set('token', res.data.token) // Ensure the token is stored in cookies
    } catch (error) {
      console.log(error.response.data)
      setError(error.response.data.errors || [error.response.data.error])
    }
  }

  const signIn = async (user) => {
    try {
      const res = await signInnRequest(user)
      setIsAuthenticated(true)
      setUser(res.data)
      Cookies.set('token', res.data.token) // Ensure the token is stored in cookies
      console.log(res.data)
    } catch (error) {
      console.log(error.response.data)
      setError(error.response.data.errors || [error.response.data.error])
    }
  }

  const logOut = async () => {
    try {
      await logoutRequest()
      Cookies.remove('token')
      setIsAuthenticated(false)
      setUser(null)
    } catch (error) {
      console.log(error)
    }
  }

  const clearError = () => {
    setError([])
  }

  useEffect(() => {
    async function checkLogin() {
      const token = Cookies.get('token') // Get the token from cookies

      if (!token) {
        setIsAuthenticated(false)
        setUser(null)
        setLoading(false)
        return
      }
      try {
        const res = await verifySession(token)
        if (!res.data) {
          setIsAuthenticated(false)
          setLoading(false)
          setUser(null)
          return
        }
        setIsAuthenticated(true)
        setUser(res.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setIsAuthenticated(false)
        setUser(null)
        setLoading(false)
      }
    }
    checkLogin()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signUp,
        user,
        isAuthenticated,
        error,
        signIn,
        loading,
        logOut,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
