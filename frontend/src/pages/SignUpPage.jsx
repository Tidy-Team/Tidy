//React
import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

//Components and utilities
import { useAuth } from '../hooks/useAuth'
import { registerSchema } from '../schemas/authSchemas'
import { zodResolver } from '@hookform/resolvers/zod'

//Icons
import { MdEmail } from 'react-icons/md'
import { FaLock, FaUser } from 'react-icons/fa'

import { Modal } from '../components'

export function SignUpPage() {
  const { signUp, errors: registerErrors, isAuthenticated } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const navigate = useNavigate()

  const onSubmit = async (value) => {
    await signUp(value)
    document.getElementById('modal').showModal()
  }

  return (
    <>
      {/* Title */}
      <div className="justify-center align-middle flex flex-col md:w-3/5 lg:max-w-lg mx-auto mt-10 ">
        <div className="w-3/5 mx-auto text-center">
          <h1 className="text-4xl mb-5">
            Bienvenido a <span className="font-bold text-purple-600">Tidy</span>
          </h1>
          <p className="mb-5">Por favor, rellene el siguiente formulario</p>
          {registerErrors && (
            <p className="text-error text-sm mb-1">{registerErrors}</p>
          )}
        </div>

        {/* Form */}
        <form
          action=""
          className="w-4/5 sm:w-3/5 mx-auto gap-3 flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Name */}
          <label className="input input-bordered border-0 border-b-2 rounded-none focus:outline-offset-0  focus-within:outline-offset-0 flex items-center gap-2">
            <FaUser />
            <input
              type="text"
              className="grow"
              placeholder="Nombre y Apellido"
              {...register('name')}
            />
          </label>
          {errors.name?.message && (
            <p className="text-error text-sm">{errors.name?.message}</p>
          )}

          {/* Email */}
          <label className="input input-bordered border-0 border-b-2 rounded-none focus:outline-offset-0  focus-within:outline-offset-0 flex items-center gap-2">
            <MdEmail />
            <input
              type="text"
              className="grow"
              placeholder="Email"
              {...register('email')}
            />
          </label>
          {errors.email?.message && (
            <p className="text-error text-sm">{errors.email?.message}</p>
          )}

          {/* Password */}
          <label className="input input-bordered border-0 border-b-2 rounded-none focus:outline-offset-0  focus-within:outline-offset-0 flex items-center gap-2">
            <FaLock />
            <input
              type="password"
              className="grow"
              placeholder="Contraseña"
              {...register('password')}
            />
          </label>
          {errors.password?.message && (
            <p className="text-error text-sm">{errors.password?.message}</p>
          )}

          <button className="btn btn-primary mt-5">Crear Cuenta</button>

          <div className="divider my-0">¿Ya tienes una cuenta?</div>
          {/* Login Redirect */}
          <Link to="/login" className="w-full">
            <button className="btn btn-secondary w-full">Iniciar Sesión</button>
          </Link>
        </form>
      </div>
      {/* Email Alert  */}

      <Modal>
        <p className="text-xl text-center">
          Por favor, revise su correo electrónico para la verificación.
        </p>
      </Modal>
    </>
  )
}
