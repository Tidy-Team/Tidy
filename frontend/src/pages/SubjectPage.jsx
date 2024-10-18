//React
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

//Components and utilities
import { useFetch } from '../hooks/useFetch.js'
import { Modal, ActivityForm, ActivitiesList } from '../components'

//Icons

export function SubjectPage() {
  const { id } = useParams()

  const {
    fetchData,
    data: subject,
    error,
    isLoading,
  } = useFetch(
    `http://localhost:3000/subjects/${id}`,
    'GET',
    null,
    { 'Content-Type': 'application/json' },
    { credentials: 'include' }
  )

  const [activities, setActivities] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const addActivity = (newActivity) => {
    const activityData = newActivity.data.activity
    if (activityData.id === undefined) {
      console.error('New activity has undefined id:', activityData)
      return
    }
    setActivities([...activities, activityData])
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="grid grid-cols-3  gap-4 md:h-[calc(100vh-90px)] max-h-full ">
      <div className="col-span-3 min-h-fit">
        <div className="flex flex-col-reverse p-5 h-48 w-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
          <h1 className="text-4xl font-semibold text-start text ">
            {subject?.subjectName}
          </h1>
        </div>
      </div>
      <div className="row-start-2 col-span-3 md:col-span-1  bg-base-300 text-center content-center rounded-md p-5 md:h-40">
        <p className="text-xl font-semibold">
          Profesores: {subject?.name_teacher}
        </p>
        <p className="text-xl font-semibold"> {subject?.description}</p>
      </div>
      <div className="col-span-3 md:col-span-2 row-span-2 row-start-3 md:row-start-2 text-center  min-h-fit ">
        <div>
          <h1 className="text-2xl font-semibold bg-base-300 rounded-md p-3 mb-2">
            Tareas
          </h1>
        </div>
        <div className="h-fit flex flex-col gap-2 md:mb-5 ">
          {/* Activities */}
          <ActivitiesList />
        </div>
      </div>
      <Modal children={<ActivityForm addActivity={addActivity} />} />
    </div>
  )
}
