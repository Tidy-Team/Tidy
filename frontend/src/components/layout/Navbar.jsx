//React
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

//Components and utilities
import { useAuth } from '../../hooks/useAuth.js'
import { LocalStorage } from '../../utils/localStorage.js'

export const Navbar = () => {
  const { isAuthenticated, logOut } = useAuth()
  const { saveTheme, loadTheme } = LocalStorage()

  useEffect(() => {
    const savedTheme = loadTheme()
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const handleThemeChange = (event) => {
    const theme = event.target.checked ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
    saveTheme(theme)
  }

  return (
    <div className="navbar sticky top-0 border-b-2 border-base-300 z-10 bg-base-100">
      <div className="w-full md:w-3/5 mx-auto justify-between">
        <Link to="/">
          <button className="btn btn-ghost text-3xl font-bold text-purple-500">
            Tidy
          </button>
        </Link>
        <div className="flex">
          <div className="flex">
            <Link to="/login">
              <button className="btn btn-ghost ">Iniciar Sesión</button>
            </Link>
            <div className="divider divider-horizontal m-0"></div>
            <Link to="/register">
              <button className="btn btn-primary ">Prueba Tidy Ya</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
