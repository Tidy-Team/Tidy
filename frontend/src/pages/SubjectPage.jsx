//React
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

//Components and utilities
import { useFetch } from '../hooks/useFetch.js'
import { Modal, ActivityForm, ActivitiesList, NotesList } from '../components'

//Icons
import { HiDotsVertical } from 'react-icons/hi'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { FaPlay } from 'react-icons/fa'

export function SubjectPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const randomImageUrl = `https://picsum.photos/seed/${id}/620/366`

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
    `http://localhost:3000/subjects/${id}/activities`,
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
    return (
      <div className="max-h-[calc(100vh-94px)] flex flex-col gap-3">
        <div className="min-h-48 rounded-2xl bg-base-200 animate-pulse"></div>
        <div className="flex-grow flex flex-col md:flex-row gap-3">
          <div className="bg-base-200 md:w-1/3 rounded-2xl h-56 animate-pulse"></div>
          <div className="md:max-h-[410px] md:w-2/3 rounded-lg bg-base-200 animate-pulse"></div>
        </div>
      </div>
    )
  }

  if (subjectError) {
    return <div>Error: {subjectError.message}</div>
  }

  return (
    <div className="max-h-[calc(100vh-94px)] flex flex-col gap-3">
      <div className="min-h-48 rounded-2xl">
        <div className="card card-compact image-full">
          <figure className="bg-cover bg-center  max-h-48">
            <img
              src={randomImageUrl}
              alt={localSubject?.subjectName}
              className="w-full"
            />
          </figure>
          <div className="card-body">
            <h1 className="card-title text-3xl">{localSubject?.subjectName}</h1>
            <p>{localSubject?.description}</p>
            <div className="flex gap-3">
              <FaChalkboardTeacher className=" text-2xl self-center" />
              <h3 className="font-semibold text-base">
                {localSubject?.name_teacher}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow flex flex-col md:flex-row gap-3">
        <div className="bg-blue-600 md:w-1/3 rounded-lg h-fit">
          <div className="collapse  md:collapse-open row-start-2 col-span-3 md:col-span-1 bg-base-300 text-center rounded-md">
            <input type="checkbox" />
            <h1 className="collapse-title text-xl font-semibold rounded-md px-0">
              Notas
            </h1>
            <div className="collapse-content">
              <div>
                <NotesList />
                <button className="btn btn-primary">Agregar nota</button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:max-h-[410px] md:w-2/3 rounded-lg bg-base-300 ">
          <div className="text-center text-xl bg-base-300 rounded-lg p-4 font-semibold ">
            Tareas
          </div>
          <div className="flex flex-col md:overflow-y-auto gap-2 p-2 rounded-lg md:min-h-28 min-h-fit">
            {localActivities.length === 0 ? (
              <h1 className="p-5 text-center">No hay tareas</h1>
            ) : (
              localActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="p-3 bg-base-200 rounded-lg text-start flex justify-between items-center"
                >
                  {activity.titulo}
                  <div className="flex items-center gap-3">
                    <button
                      className="btn btn-sm btn-primary btn-circle"
                      onClick={() => {
                        navigate(`/activity/${activity.id}`)
                      }}
                    >
                      <FaPlay className="fill-base-200" />
                    </button>
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
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box"
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
      </div>
      <Modal children={<ActivityForm addActivity={addActivity} />} />
    </div>
  )
}
