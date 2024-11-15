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
      setUser(res.data.user)
    } catch (error) {
      console.log(error.response.data)
      setError(error.response.data.errors || [error.response.data.error])
    }
  }

  const signIn = async (user) => {
    try {
      const res = await signInnRequest(user)
      setIsAuthenticated(true)
      setUser(res.data.user)
    } catch (error) {
      console.log(error)
      setError(error.response.data.errors || [error.response.data.error])
    }
  }

  const logOut = async () => {
    try {
      await logoutRequest()
      Cookies.remove('authToken')
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
      try {
        const res = await verifySession()

        if (!res.data || !res.data.user) {
          console.log('No user data found in response, setting user to null')

          setIsAuthenticated(false)
          setLoading(false)
          setUser(null)
          return
        }
        setIsAuthenticated(true)
        setUser(res.data.user)
        setLoading(false)
      } catch (error) {
        console.log('Error during session verification:', error.response.data)

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
