//React
import { useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

//Components and utilities
import { useAuth } from '../../hooks/useAuth.js'
import { LocalStorage } from '../../utils/localStorage.js'
import Avatar from 'boring-avatars'

//Icons
import { TiThMenu } from 'react-icons/ti'
import { BiSolidBook } from 'react-icons/bi'
import { FaCalendarAlt } from 'react-icons/fa'
import { BsLightningChargeFill } from 'react-icons/bs'
import { IoMdSettings } from 'react-icons/io'
import { FaUser } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { CgDarkMode } from 'react-icons/cg'

export function SideNav({ children }) {
  const { user, logOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const { saveTheme, loadTheme } = LocalStorage()

  useEffect(() => {
    const savedTheme = loadTheme()
    document.documentElement.setAttribute('data-theme', savedTheme)
    const themeRadio = document.querySelector(
      `input[name="theme-dropdown"][value="${savedTheme}"]`
    )
    if (themeRadio) {
      themeRadio.checked = true
    }
    // Trigger the transition on initial load
    const mainContent = document.getElementById('main-content')
    const sidebar = document.getElementById('sidebar')
    if (mainContent && sidebar) {
      console.log('Applying transition on initial load')
      mainContent.classList.remove('opacity-0', 'translate-y-5')
      sidebar.classList.remove('opacity-0', 'translate-y-5')
    }
  }, [])

  useEffect(() => {
    // Trigger the transition on location change
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      console.log('Applying transition on location change')
      mainContent.classList.add('opacity-0', 'translate-y-5')

      setTimeout(() => {
        mainContent.classList.remove('opacity-0', 'translate-y-5')
      }, 0)
    }
  }, [location.pathname])

  const handleThemeChange = (event) => {
    const theme = event.target.value
    document.documentElement.setAttribute('data-theme', theme)
    saveTheme(theme)
  }

  const handleLogOut = () => {
    logOut()
    navigate('/')
  }

  const buttonText =
    location.pathname === '/subjects' ? 'Añadir Materia' : 'Añadir Tarea'

  const showButton = ['/subjects', '/subject/:id'].some((path) =>
    location.pathname.startsWith(path)
  )

  const closeDrawer = () => {
    document.getElementById('drawer').checked = false
  }

  return (
    <>
      <div className="bg-base-100 drawer lg:drawer-open">
        <input id="drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="bg-base-100 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)]">
            <nav className="navbar w-full  px-6">
              <div className="flex flex-1 md:gap-1 lg:gap-2">
                <span
                  className="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]"
                  data-tip="Menu"
                >
                  <label
                    aria-label="Open menu"
                    htmlFor="drawer"
                    className="btn btn-square btn-ghost drawer-button lg:hidden text-2xl"
                  >
                    <TiThMenu />
                  </label>
                </span>
                <div className="flex items-center gap-2 lg:hidden">
                  <Link to="/subjects">
                    <button className="btn btn-ghost text-3xl font-bold text-purple-500">
                      Tidy
                    </button>
                  </Link>
                </div>
              </div>
              <div className="flex-0">
                <div className="flex ">
                  {showButton && (
                    <button
                      className="btn btn-primary h-10 min-h-10 w-36 "
                      onClick={() =>
                        document.getElementById('modal').showModal()
                      }
                    >
                      {buttonText}
                    </button>
                  )}
                </div>
              </div>
            </nav>
          </div>
          <div className='class="max-w-[100vw] px-6 pb-5 xl:pr-2"'>
            <div
              className="flex flex-col-reverse justify-between gap-6 xl:flex-row transition-opacity duration-500 ease-out opacity-0 transform translate-y-5"
              id="main-content"
            >
              {/* Main Content */}
              <div className="flex-grow ">{children}</div>
            </div>
          </div>
        </div>
        <div
          className="drawer-side z-40"
          style={{
            scrollBehavior: 'smooth',
            scrollPaddingTop: '5rem',
          }}
        >
          <label
            htmlFor="drawer"
            aria-label="Close menu"
            className="drawer-overlay"
          ></label>
          <aside
            className="bg-base-300 h-screen w-72 overflow-y-auto sticky top-0 items-center z-20 py-6 px-4 space-y-3 bg-opacity-90 backdrop-blur flex flex-col transition-opacity duration-500 ease-out opacity-0 transform translate-y-5"
            id="sidebar"
          >
            <div className="bg-base-300 hidden lg:flex ">
              <Link to="/subjects" onClick={closeDrawer}>
                <button className="btn btn-ghost text-3xl font-bold text-purple-500">
                  Tidy
                </button>
              </Link>
            </div>
            {user && (
              <>
                <Avatar
                  name={user.name}
                  colors={[
                    '#d94052',
                    '#ee7e4c',
                    '#ead56c',
                    '#94c5a5',
                    '#898b75',
                  ]}
                  variant="beam"
                  className="w-28 rounded-full "
                />
                <h2 className="font-bold text-lg">{user.name}</h2>
                <span className="text-sm text-accent">{user.email}</span>
              </>
            )}
            <ul className="menu menu-lg gap-1 w-full">
              <li>
                <Link
                  to="/subjects"
                  onClick={closeDrawer}
                  className={location.pathname === '/subjects' ? 'active' : ''}
                >
                  <BiSolidBook />
                  Materias
                </Link>
              </li>
              <li>
                <Link
                  to="/stats"
                  onClick={closeDrawer}
                  className={location.pathname === '/stats' ? 'active' : ''}
                >
                  <BsLightningChargeFill />
                  Estadisticas
                </Link>
              </li>
              <li>
                <Link
                  to="/calendar"
                  onClick={closeDrawer}
                  className={location.pathname === '/calendar' ? 'active' : ''}
                >
                  <FaCalendarAlt />
                  Calendario
                </Link>
              </li>

              <li>
                <details close="true">
                  <summary>
                    <IoMdSettings />
                    Ajustes
                  </summary>
                  <ul className="mt-1">
                    <li>
                      <Link
                        to="/profile"
                        onClick={closeDrawer}
                        className={
                          location.pathname === '/profile' ? 'active' : ''
                        }
                      >
                        <FaUser />
                        Cuenta
                      </Link>
                    </li>
                    <li className="dropdown dropdown-top w-full">
                      <a tabIndex={0} role="button">
                        <CgDarkMode />
                        Cambiar tema
                        <ul
                          tabIndex={0}
                          className="dropdown-content bg-base-200 rounded-box  z-[1]  p-2 shadow-2xl"
                        >
                          <li>
                            <input
                              type="radio"
                              name="theme-dropdown"
                              className="theme-controller btn btn-sm text-base py-0 btn-ghost justify-start "
                              aria-label="Claro"
                              value="cupcake"
                              onChange={handleThemeChange}
                            />
                          </li>
                          <li>
                            <input
                              type="radio"
                              name="theme-dropdown"
                              className="theme-controller btn btn-sm text-base py-0 btn-ghost justify-start"
                              aria-label="Oscuro"
                              value="dark"
                              onChange={handleThemeChange}
                            />
                          </li>
                          <li>
                            <input
                              type="radio"
                              name="theme-dropdown"
                              className="theme-controller btn btn-sm text-base py-0 btn-ghost justify-start"
                              aria-label="Sistema"
                              value="default"
                              onChange={handleThemeChange}
                            />
                          </li>
                        </ul>
                      </a>
                    </li>
                    <li>
                      <a onClick={handleLogOut}>
                        <FiLogOut />
                        Cerrar Sesión
                      </a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </>
  )
}
