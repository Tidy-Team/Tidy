import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth.js';

export const Navbar = () => {
  const { isAuthenticated, logOut } = useAuth();

  return (
    <div className="navbar sticky top-0 border-b-2 z-10 bg-base-100">
      <div className="w-full md:w-3/5 mx-auto justify-between">
        <Link to="/">
          <button className="btn btn-ghost text-3xl font-bold text-purple-500">Tidy</button>
        </Link>
        {isAuthenticated ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <Link to="/" onClick={() => logOut()}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex">
            <Link to="/login">
              <button className="btn btn-ghost ">Iniciar Sesión</button>
            </Link>
            <div className="divider divider-horizontal m-0"></div>
            <Link to="/register">
              <button className="btn btn-primary ">Prueba Tidy Ya</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
