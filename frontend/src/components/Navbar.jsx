import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

  return (
    <div className="navbar sticky top-0 border-b-2 z-10 bg-base-100">
      <div className="w-full md:w-3/5 mx-auto justify-between">
        <Link to="/">
          <button className="btn btn-ghost text-3xl font-bold text-purple-500">
            Tidy
          </button>
        </Link>
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
  );
};
