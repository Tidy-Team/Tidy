import { TiThMenu } from 'react-icons/ti';
import { BiSolidBook } from 'react-icons/bi';
import { FaCalendarAlt } from 'react-icons/fa';
import { BsLightningChargeFill } from 'react-icons/bs';

import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth.js';

export function SideNav({ children }) {
  return (
    <>
      <div className="bg-base-100 drawer lg:drawer-open">
        <input id="drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="bg-base-100 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)]">
            <nav className="navbar w-full  ">
              <div className="flex flex-1 md:gap-1 lg:gap-2">
                <span className="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]" data-tip="Menu">
                  <label
                    aria-label="Open menu"
                    htmlFor="drawer"
                    className="btn btn-square btn-ghost drawer-button lg:hidden text-2xl"
                  >
                    <TiThMenu />
                  </label>
                </span>
                <div className="flex items-center gap-2 lg:hidden">
                  <Link to="/">
                    <button className="btn btn-ghost text-4xl font-bold text-purple-500">Tidy</button>
                  </Link>
                </div>
              </div>
              <div className="flex-0">
                <div className="flex gap-5">
                  {/* Theme Change */}
                  <label className="swap swap-rotate">
                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox" className="theme-controller" value="synthwave" />

                    {/* sun icon */}
                    <svg className="swap-off h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>

                    {/* moon icon */}
                    <svg className="swap-on h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                  </label>

                  {/* User */}
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="Tailwind CSS Navbar component"
                          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        />
                      </div>
                    </div>
                    <ul tabIndex={0} className="menu dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-36 p-2 shadow">
                      <li>
                        <a>Perfil</a>
                      </li>
                      <li>
                        <Link to="/" onClick={() => logOut()}>
                          Cerrar Sesión
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div className='class="max-w-[100vw] px-6 pb-16 xl:pr-2"'>
            <div className="flex flex-col-reverse justify-between gap-6 xl:flex-row">
              {/* Main Content */}
              <div className="flex-grow">{children}</div>
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
          <label htmlFor="drawer" aria-label="Close menu" className="drawer-overlay"></label>
          <aside className="bg-base-200 min-h-screen w-60">
            <div className="bg-base-200 sticky top-0 z-20 hidden items-center gap-2 bg-opacity-90 px-4 py-2 backdrop-blur lg:flex ">
              <Link to="/">
                <button className="btn btn-ghost text-4xl font-bold text-purple-500">Tidy</button>
              </Link>
            </div>
            <div className="h-5 lg:h-0"></div>
            <ul className="menu px-4 py-0 text-lg">
              <li>
                <a>
                  <BiSolidBook />
                  Materias
                </a>
              </li>
              <li>
                <a>
                  <BsLightningChargeFill />
                  Estadisticas
                </a>
              </li>
              <li>
                <a>
                  <FaCalendarAlt />
                  Calendario
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </>
  );
}
