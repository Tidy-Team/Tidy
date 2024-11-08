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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <h1 className="text-center font-semibold text-2xl">Agregar Materia</h1>
      <label className="inform-control w-full">
        <div className="label">
          <span className="label-text">Nombre de materia</span>
        </div>

        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Matemática"
          {...register('subjectName', { required: 'Required' })}
        />
        {errors.subjectName && (
          <span className="text-error text-sm mt-1">
            {errors.subjectName.message}
          </span>
        )}
      </label>

      <label className="inform-control w-full">
        <div className="label">
          <span className="label-text">Descripción</span>
        </div>

        <input
          type="text"
          name="description"
          className="input input-bordered w-full"
          placeholder="2ndo cuatrimestre"
          {...register('description', { required: 'Required' })}
        />
        {errors.description && (
          <span className="text-error text-sm mt-1">
            {errors.description.message}
          </span>
        )}
      </label>

      <label className="inform-control w-full">
        <div className="label">
          <span className="label-text">Nombre del profesor/a</span>
        </div>
        <input
          type="text"
          name="name_teacher"
          className="input input-bordered w-full"
          placeholder="Johanna"
          {...register('name_teacher', { required: 'Required' })}
        />
        {errors.name_teacher && (
          <span className="text-error text-sm mt-1">
            {errors.name_teacher.message}
          </span>
        )}
      </label>
      <button
        className="btn btn-primary mt-4"
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
