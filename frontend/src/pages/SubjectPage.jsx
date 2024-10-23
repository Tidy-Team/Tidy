//React
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

//Components and utilities
import { useFetch } from '../hooks/useFetch.js'
import { Modal, ActivityForm, ActivitiesList } from '../components'

//Icons
import { HiDotsVertical } from 'react-icons/hi'

export function SubjectPage() {
  const { id } = useParams()

  const {
    fetchData: fetchSubjectData,
    data: subject,
    error: subjectError,
    isLoading: isSubjectLoading,
  } = useFetch(
    `http://localhost:3000/subjects/${id}`,
    'GET',
    { 'Content-Type': 'application/json' },
    { credentials: 'include' }
  )

  const {
    fetchData: fetchActivitiesData,
    data: activities,
    error: activitiesError,
    isLoading: isActivitiesLoading,
  } = useFetch(
    `http://localhost:3000/activities/${id}`,
    'GET',
    { 'Content-Type': 'application/json' },
    { credentials: 'include' }
  )

  const [localSubject, setLocalSubject] = useState(null)
  const [localActivities, setLocalActivities] = useState([])

  useEffect(() => {
    fetchSubjectData()
    fetchActivitiesData()
  }, [])

  useEffect(() => {
    if (subject) {
      setLocalSubject(subject)
    }
  }, [subject])

  useEffect(() => {
    if (activities) {
      setLocalActivities(activities)
    }
  }, [activities])

  const addActivity = (newActivity) => {
    setLocalActivities((prevActivities) => [...prevActivities, newActivity])
  }

  if (isSubjectLoading || isActivitiesLoading) {
    return <div>Loading...</div>
  }

  if (subjectError) {
    return <div>Error: {subjectError.message}</div>
  }

  if (activitiesError) {
    return <div>Error: {activitiesError.message}</div>
  }

  return (
    <div className="grid grid-cols-3  gap-4 md:h-[calc(100vh-90px)] max-h-full ">
      <div className="col-span-3 min-h-fit">
        <div className="flex flex-col-reverse p-5 h-48 w-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
          <h1 className="text-4xl font-semibold text-start text ">
            {localSubject?.subjectName}
          </h1>
        </div>
      </div>
      <div className="row-start-2 col-span-3 md:col-span-1  bg-base-300 text-center content-center rounded-md p-5 md:h-40">
        <p className="text-xl font-semibold">
          Profesores: {localSubject?.name_teacher}
        </p>
        <p className="text-xl font-semibold"> {localSubject?.description}</p>
      </div>
      <div className="col-span-3 md:col-span-2 row-span-2 row-start-3 md:row-start-2 text-center  min-h-fit ">
        <div>
          <h1 className="text-2xl font-semibold bg-base-300 rounded-md p-3 mb-2">
            Tareas
          </h1>
        </div>
        <div className="h-fit flex flex-col gap-2 md:mb-5 ">
          {/* Activities */}
          {localActivities.length === 0 ? (
            <h1 className="p-5">No hay tareas</h1>
          ) : (
            localActivities.map((activity) => (
              <div
                key={activity.id}
                className="p-3 bg-base-300 rounded-lg text-start flex justify-between items-center"
              >
                {activity.titulo}
                <div className="flex items-center gap-3">
                  <button
                    className="btn btn-sm btn-primary btn-circle"
                    onClick={() => {
                      console.log(activity.id)
                    }}
                  ></button>
                  <div className="dropdown dropdown-left">
                    <div
                      tabIndex="0"
                      role="button"
                      className="btn btn-circle btn-sm mb-1"
                    >
                      <HiDotsVertical />
                    </div>

                    <ul
                      tabIndex="0"
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box  "
                    >
                      <li>
                        <a>Edit</a>
                      </li>
                      <li>
                        <a>Delete</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Modal children={<ActivityForm addActivity={addActivity} />} />
    </div>
  )
}
