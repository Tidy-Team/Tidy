import Logo from '../assets/tidy.png';

export const Navbar = () => {
  return (
    <div class="navbar border-b-2">
      <div className="w-full md:w-3/5 mx-auto justify-between">
        <button class="btn btn-ghost text-3xl font-bold text-purple-500">
          Tidy
        </button>
        <button class="btn btn-primary ">Iniciar Sesión</button>
      </div>
    </div>
  );
};
