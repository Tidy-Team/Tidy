//React
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useFetch } from '../../hooks/useFetch'

export function ActivitiesList() {
  const { id } = useParams()

  const {
    fetchData,
    data: activities,
    error,
    isLoading,
  } = useFetch(
    `http://localhost:3000/activities/${id}`,
    'GET',
    { 'Content-Type': 'application/json' },
    { credentials: 'include' }
  )

  useEffect(() => {
    fetchData()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    const errorMessage = JSON.parse(error.message).data.message
    if (errorMessage === 'No se encontraron actividades') {
      return <h1 className="p-5">No hay tareas</h1>
    }
    return <div>Error: {errorMessage}</div>
  }

  return (
    <>
      {activities?.map((activity) => (
        <div
          key={activity.id}
          className="p-5 bg-base-300 rounded-lg text-start"
        >
          {activity.titulo}
        </div>
      ))}
    </>
  )
}
