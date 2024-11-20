//React
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

//Components and utilities
import { useFetch } from '../../hooks/useFetch'

//Icons

export function ActivityForm({ addActivity }) {
  const [formData, setFormData] = useState(null)
  const { id } = useParams()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      titulo: '',
      description: '',
      num_preguntas: 0,
      prioridad_id: '',
    },
  })

  const { data, error, isLoading, fetchData } = useFetch(
    `http://localhost:3000/subjects/${id}/activities`,
    'POST',
    formData,
    { 'Content-Type': 'application/json' },
    { credentials: 'include' }
  )

  useEffect(() => {
    if (formData) {
      fetchData(formData)
    }
  }, [formData]) // Correctly associate the dependency array with the useEffect

  useEffect(() => {
    if (data) {
      addActivity(data.activity)
      reset() // Reset the form after successful submission
    }
  }, [data]) // Correctly associate the dependency array with the useEffect

  const onSubmit = (formData) => {
    try {
      const currentDate = new Date()
      const dueDate = new Date(formData.fecha_fin)
      const timeDiff = dueDate - currentDate
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))

      let prioridad_id
      if (daysDiff <= 7) {
        prioridad_id = 3 // High priority
      } else if (daysDiff <= 14) {
        prioridad_id = 2 // Medium priority
      } else {
        prioridad_id = 1 // Low priority
      }

      const transformedData = {
        ...formData,
        option: 'Option-1',
        num_preguntas: Number(formData.num_preguntas),
        prioridad_id: prioridad_id,
      }

      setFormData(transformedData)
      document.getElementById('modal-activity').close()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className="flex flex-col " onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-center font-semibold text-2xl ">Agregar Tarea</h1>

      <label className="form-control w-full  ">
        <div className="label">
          <span className="label-text">Título</span>
        </div>

        <input
          type="text"
          className="input input-bordered"
          placeholder="ej: Matemática 1: Funciones"
          {...register('titulo', { required: 'Obligatorio' })}
        />
        {errors.titulo && (
          <span className="text-error text-sm mt-1">
            {errors.titulo.message}
          </span>
        )}
      </label>

      <div className="flex flex-col md:flex-row w-full md:gap-2">
        <label className="form-control md:w-1/2">
          <div className="label">
            <span className="label-text">Número de consignas</span>
          </div>

          <input
            type="number"
            className="input input-bordered"
            placeholder="ej: 1, 5, 10"
            min={1}
            {...register('num_preguntas', { required: 'Obligatorio' })}
          />
          {errors.num_preguntas && (
            <span className="text-error text-sm mt-1">
              {errors.num_preguntas.message}
            </span>
          )}
        </label>

        <label className="form-control md:w-1/2">
          <div className="label">
            <span className="label-text">Fecha de entrega</span>
          </div>

          <input
            type="date"
            className="input input-bordered"
            min={new Date().toJSON().slice(0, 10)}
            {...register('fecha_fin', { required: 'Obligatorio' })}
          />
          {errors.fecha_fin && (
            <span className="text-error text-sm mt-1">
              {errors.fecha_fin.message}
            </span>
          )}
        </label>
      </div>

      <button className="btn btn-primary mt-4" type="submit">
        Confirmar
      </button>
    </form>
  )
}
