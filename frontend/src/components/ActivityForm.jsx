import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useActivities } from '../context/useActvity'
import { useForm } from 'react-hook-form'
import { GoNumber } from 'react-icons/go'
import { IoText } from 'react-icons/io5'

export function ActivityForm({ addActivity }) {
  const { getActivities, createActivity } = useActivities()
  const params = useParams()

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      let newActivity

      addActivity(newSubject)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const loadActivities = async () => {
      if (params.id) {
        const activity = await getActivities(params.id)
        console.log(activity)
        setValue('subjectName', activity.title)
        setValue('description', activity.description)
      }
    }
    loadActivities()
  }, [])

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-center font-semibold text-2xl mb-3">Agregar Tarea</h1>
      <label className="input input-bordered flex items-center gap-2 ">
        <IoText />
        <input
          type="text"
          name="titulo"
          className="grow"
          placeholder="Titulo"
          {...register('titulo')}
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
        <GoNumber className="text-2xl" />
        <input
          type="number"
          name="num_preguntas"
          className="grow"
          placeholder="Numero de preguntas"
          {...register('num_preguntas')}
        />
      </label>

      <select className="select select-bordered w-full  ">
        <option disabled selected>
          Elegir Prioridad
        </option>
        <option defaultValue={1}>Baja</option>
        <option defaultValue={2}>Media</option>
        <option defaultValue={3}>Alta</option>
      </select>

      <button className="btn btn-primary" type="submit">
        Ok
      </button>
    </form>
  )
}
