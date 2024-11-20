import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'

export function NoteForm({ addNote }) {
  const [formData, setFormData] = useState(null)
  const { id: subjectId } = useParams()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: '',
    },
  })
  const { data, error, isLoading, fetchData } = useFetch(
    `http://localhost:3000/subject/${subjectId}/note`,
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
      addNote(data.Nota)
      reset() // Reset the form after successful submission
      document.getElementById('modal-note').close()
    }
  }, [data])

  const onSubmit = (formData) => {
    try {
      setFormData(formData)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-center font-semibold text-2xl">Agregar Nota</h1>

      <label className="form-control w-full">
        <textarea
          className="textarea textarea-bordered"
          placeholder="Escribe tu nota aquí..."
          {...register('description', { required: 'Obligatorio' })}
        />
        {errors.description && (
          <span className="text-error text-sm mt-1">
            {errors.description.message}
          </span>
        )}
      </label>

      <button className="btn btn-primary mt-4" type="submit">
        Confirmar
      </button>
    </form>
  )
}
