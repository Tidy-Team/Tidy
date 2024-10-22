//React
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

//Components and utilities
import { useFetch } from '../../hooks/useFetch'

//Icons
import { GoNumber } from 'react-icons/go'
import { IoText } from 'react-icons/io5'

export function ActivityForm({ addActivity }) {
  const { id } = useParams()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      titulo: '',
      description: '',
      num_preguntas: 0,
      prioridad: '',
    },
  })

  const onSubmit = async (data) => {
    try {
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-center font-semibold text-2xl mb-3">Agregar Tarea</h1>
      <label className="input input-bordered flex items-center gap-2 ">
        <IoText />
        <input
          type="text"
          className="grow"
          placeholder="Example of activity"
          {...register('titulo', { required: 'Required' })}
        />
        {errors.titulo && <span>{errors.titulo.message}</span>}
      </label>

      <label className="input input-bordered flex items-center gap-2">
        <IoText />
        <input
          type="text"
          className="grow"
          placeholder="Descripcion"
          {...register('description', { required: 'Required' })}
        />
        {errors.description && <span>{errors.description.message}</span>}
      </label>

      <label className="input input-bordered flex items-center gap-2">
        <GoNumber className="text-2xl" />
        <input
          type="number"
          className="grow"
          placeholder="Numero de preguntas"
          {...register('num_preguntas', { required: 'Required' })}
        />
        {errors.num_preguntas && <span>{errors.num_preguntas.message}</span>}
      </label>

      <select
        className="select select-bordered w-full"
        {...register('prioridad', { required: 'Prioridad no válida' })}
        defaultValue=""
      >
        <option value="" disabled>
          Elegir Prioridad
        </option>
        <option value="1">Baja</option>
        <option value="2">Media</option>
        <option value="3">Alta</option>
      </select>
      {errors.prioridad && <span>{errors.prioridad.message}</span>}

      <button className="btn btn-primary" type="submit"></button>
    </form>
  )
}
