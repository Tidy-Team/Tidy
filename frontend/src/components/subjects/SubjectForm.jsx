//React
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

//Components and utilities
import { useSubjects } from '../../hooks/useSubject'

//Icons
import { useForm } from 'react-hook-form'
import { IoText } from 'react-icons/io5'

export function SubjectForm({ addSubject }) {
  const { createSubject, getSubject, updateSubject } = useSubjects()
  const params = useParams()

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      let newSubject
      if (params.id) {
        newSubject = await updateSubject(params.id, data)
      } else {
        newSubject = await createSubject(data)
      }
      addSubject(newSubject)
      reset()
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const loadSubject = async () => {
      if (params.id) {
        const subject = await getSubject(params.id)
        console.log(subject)
        setValue('subjectName', subject.subjectName)
        setValue('description', subject.description)
        setValue('name_teacher', subject.name_teacher)
      }
    }
    loadSubject()
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <h1 className="text-center font-semibold text-2xl mb-3">
        Agregar Materia
      </h1>
      <label className="input input-bordered flex items-center gap-2">
        <IoText />
        <input
          type="text"
          name="subjectName"
          className="grow"
          placeholder="Nombre de Materia"
          {...register('subjectName')}
        />
      </label>

      <label className="input input-bordered flex items-center gap-2">
        <IoText />

        <input
          type="text"
          name="description"
          className="grow"
          placeholder="Descripcion"
          {...register('description')}
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
          {...register('name_teacher')}
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
