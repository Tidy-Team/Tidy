//React
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'

//Components and utilities

//Icons
import { useForm } from 'react-hook-form'
import { IoText } from 'react-icons/io5'

export function SubjectForm({ addSubject }) {
  const [formData, setFormData] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subjectName: '',
      description: '',
      name_teacher: '',
    },
  })

  const { data, error, isLoading, fetchData } = useFetch(
    `http://localhost:3000/subjects`,
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
      addSubject(data.subject)
      reset() // Reset the form after successful submission
    }
  }, [data]) // Correctly associate the dependency array with the useEffect

  const onSubmit = (formData) => {
    try {
      setFormData(formData)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <h1 className="text-center font-semibold text-2xl mb-3">
        Agregar Materia
      </h1>
      <label className="input input-bordered flex items-center gap-2">
        <IoText />
        <input
          type="text"
          className="grow"
          placeholder="Nombre de Materia"
          {...register('subjectName', { required: 'Required' })}
        />
      </label>

      <label className="input input-bordered flex items-center gap-2">
        <IoText />

        <input
          type="text"
          name="description"
          className="grow"
          placeholder="Descripcion"
          {...register('description', { required: 'Required' })}
        />
      </label>

      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          type="text"
          name="name_teacher"
          className="grow"
          placeholder="Nombre de Profesor"
          {...register('name_teacher', { required: 'Required' })}
        />
      </label>
      <button
        className="btn btn-primary"
        type="submit"
        onClick={() => {
          document.getElementById('modal').close()
        }}
      >
        Ok
      </button>
    </form>
  )
}
