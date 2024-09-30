import { Navbar } from '../components';
import { MdEmail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';

export function LoginPage() {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Title */}
      <div className="justify-center align-middle flex flex-col md:w-3/5 lg:max-w-lg mx-auto mt-10 ">
        <div className="w-3/5 mx-auto text-center">
          <h1 className="text-4xl mb-5">Bienvenido de vuelta</h1>
          <p className="mb-5">
            Por favor, ingrese su correo electrónico y contraseña
          </p>
        </div>

        {/* Form */}
        <form action="" className="w-4/5 sm:w-3/5 mx-auto gap-3 flex flex-col">
          {/* Email */}
          <label className="input input-bordered border-0 border-b-2 rounded-none focus:outline-offset-0  focus-within:outline-offset-0 flex items-center gap-2">
            <MdEmail />
            <input type="text" className="grow" placeholder="Email" />
          </label>

          {/* Password */}
          <label className="input input-bordered border-0 border-b-2 rounded-none focus:outline-offset-0  focus-within:outline-offset-0 flex items-center gap-2">
            <FaLock />
            <input type="password" className="grow" placeholder="Contraseña" />
          </label>
          <a href="#" className="text-purple-600 ">
            Recuperar contraseña
          </a>

          <button className="btn btn-primary mt-5">Iniciar Sesión</button>
        </form>
      </div>
    </>
  );
}
