//React
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

//Components and utilities
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../hooks/useAuth'
import { loginSchema } from '../schemas/authSchemas'

//Icons
import { MdEmail } from 'react-icons/md'
import { FaLock } from 'react-icons/fa'

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })
  const { signIn, errors: loginErrors, isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()
  const onSubmit = (data) => signIn(data)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/subjects')
    }
  }, [isAuthenticated, navigate])

  return (
    <>
      {/* Title */}
      <div className="justify-center align-middle flex flex-col md:w-3/5 lg:max-w-lg mx-auto mt-10 ">
        <div className="w-3/5 mx-auto text-center">
          <h1 className="text-4xl mb-5">Bienvenido de vuelta</h1>
          <p className="mb-5">
            Por favor, ingrese su correo electrónico y contraseña
          </p>
        </div>

        {/* Form */}
        <form
          action=""
          className="w-4/5 sm:w-3/5 mx-auto gap-3 flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
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
          </label>
          <p className="text-error text-sm">{errors.email?.message}</p>

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
          </label>
          <p className="text-error text-sm">{errors.password?.message}</p>
          {/* Login Errors */}
          {loginErrors && (
            <p className="text-error text-sm mb-1">{loginErrors}</p>
          )}
          {/* Reset Password */}
          <a href="#" className="text-purple-600 text-sm ">
            Recuperar contraseña
          </a>
          {/* Submit */}
          <button className="btn btn-primary mt-4 " disabled={loading}>
            {loading ? (
              <span className="loading loading-dots loading-md"></span>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
          <div className="divider my-0">¿Todavía no tienes una cuenta?</div>
          {/* Register Redirect */}
          <Link to="/register" className="w-full">
            <button className="btn btn-secondary w-full">Registrarse</button>
          </Link>
        </form>
      </div>
    </>
  )
}
