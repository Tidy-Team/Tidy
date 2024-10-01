import { useAuth } from '../context/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../schemas/authSchemas';

import { MdEmail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { signIn, errors: loginErrors = [], isAuthenticated } = useAuth(); // Provide default value for loginErrors
  const navigate = useNavigate();
  const onSubmit = data => signIn(data);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {/* Title */}
      <div className="justify-center align-middle flex flex-col md:w-3/5 lg:max-w-lg mx-auto mt-10 ">
        <div className="w-3/5 mx-auto text-center">
          <h1 className="text-4xl mb-5">Bienvenido de vuelta</h1>
          <p className="mb-5">Por favor, ingrese su correo electrónico y contraseña</p>
          {loginErrors.map((error, i) => (
            <Message message={error} key={i} />
          ))}
        </div>

        {/* Form */}
        <form action="" className="w-4/5 sm:w-3/5 mx-auto gap-3 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <label className="input input-bordered border-0 border-b-2 rounded-none focus:outline-offset-0  focus-within:outline-offset-0 flex items-center gap-2">
            <MdEmail />
            <input
              type="email"
              name="email"
              className="grow"
              placeholder="Correo electrónico"
              {...register('email', { required: true })}
            />
            <p className="text-error-content text-sm">{errors.email?.message}</p>
          </label>

          {/* Password */}
          <label className="input input-bordered border-0 border-b-2 rounded-none focus:outline-offset-0  focus-within:outline-offset-0 flex items-center gap-2">
            <FaLock />
            <input
              type="password"
              name="password"
              className="grow"
              placeholder="Contraseña"
              {...register('password', { required: true, minLength: 6 })}
            />
            <p className="text-error-content text-sm">{errors.password?.message}</p>
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
