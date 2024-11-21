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
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  const signUp = async (user) => {
    setLoading(true)

    try {
      const res = await signUpRequest(user)
      setIsAuthenticated(true)
      setUser(res.data.user)
      setLoading(false)
    } catch (error) {
      console.log(error.response.data)
      setErrors(error.response.data.message || [error.response.data.message])
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (user) => {
    setLoading(true)
    try {
      await signInnRequest(user)
      const res = await verifySession()
      setIsAuthenticated(true)
      setUser(res.data.user)
      setLoading(false)
    } catch (error) {
      console.log(error.response.data)
      setErrors(error.response.data)
    } finally {
      setLoading(false)
    }
  }

  const logOut = async () => {
    setLoading(true)

    try {
      await logoutRequest()
      Cookies.remove('authToken')
      setIsAuthenticated(false)
      setUser(null)
    } catch (error) {
      console.log(error.response.data)
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => {
    setErrors([])
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
      } finally {
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
        errors,
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
