import { Navbar } from '../components';
import { MdEmail } from 'react-icons/md';
import { FaLock, FaUser } from 'react-icons/fa';

export function SignUpPage() {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Title */}
      <div className="justify-center align-middle flex flex-col md:w-3/5 lg:max-w-lg mx-auto mt-10 ">
        <div className="w-3/5 mx-auto text-center">
          <h1 className="text-4xl mb-5">
            Bienvenido a <span className="font-bold text-purple-600">Tidy</span>
          </h1>
          <p className="mb-5">Por favor, rellene el siguiente formulario</p>
        </div>

        {/* Form */}
        <form action="" className="w-4/5 sm:w-3/5 mx-auto gap-3 flex flex-col">
          {/* Email */}
          <label className="input input-bordered border-0 border-b-2 rounded-none focus:outline-offset-0  focus-within:outline-offset-0 flex items-center gap-2">
            <MdEmail />
            <input type="text" className="grow" placeholder="Email" />
          </label>

          {/* Name */}
          <label className="input input-bordered border-0 border-b-2 rounded-none focus:outline-offset-0  focus-within:outline-offset-0 flex items-center gap-2">
            <FaUser />
            <input
              type="text"
              className="grow"
              placeholder="Nombre y Apellido"
            />
          </label>

          {/* Password */}
          <label className="input input-bordered border-0 border-b-2 rounded-none focus:outline-offset-0  focus-within:outline-offset-0 flex items-center gap-2">
            <FaLock />
            <input type="password" className="grow" placeholder="Contraseña" />
          </label>

          <button className="btn btn-primary mt-5">Crear Cuenta</button>
        </form>
      </div>
    </>
  );
}
