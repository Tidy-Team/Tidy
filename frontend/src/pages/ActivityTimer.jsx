import { useNavigate, useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { useEffect, useState } from 'react'

export const ActivityTimer = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { fetchData, data, error, isLoading } = useFetch(
    `http://localhost:3000/subtasks/${id}`,
    'GET',
    { 'Content-Type': 'application/json' },
    { credentials: 'include' }
  )

  const [localSubTasks, setLocalSubTask] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (data) {
      setLocalSubTask(data.Subtareas)
    }
  }, [data])

  return (
    <div>
      {localSubTasks.map((subtask) => (
        <div key={subtask.id} className="my-5">
          {subtask.titulo}
        </div>
      ))}
    </div>
  )
}
