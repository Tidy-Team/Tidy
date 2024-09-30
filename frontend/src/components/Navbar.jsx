import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

  return (
    <div class="navbar border-b-2">
      <div className="w-full md:w-3/5 mx-auto justify-between">
        <Link to="/">
          <button class="btn btn-ghost text-3xl font-bold text-purple-500">
            Tidy
          </button>
        </Link>
        <Link to="/login">
          <button class="btn btn-primary ">Iniciar Sesión</button>
        </Link>
      </div>
    </div>
  );
};
