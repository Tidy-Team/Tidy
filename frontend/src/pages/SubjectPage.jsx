//React
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

//Components and utilities
import { useFetch } from '../hooks/useFetch.js'
import { Modal, ActivityForm, ActivitiesList, NotesList } from '../components'

//Icons
import { HiDotsVertical } from 'react-icons/hi'
import { BiPlus } from 'react-icons/bi'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { FaPlay } from 'react-icons/fa'
import { MdEdit, MdDelete } from 'react-icons/md'

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
  const [imageLoaded, setImageLoaded] = useState(false)

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
      <div className="min-h-[calc(100vh-94px)] flex flex-col gap-3">
        <div className="min-h-48 rounded-2xl bg-base-200 animate-pulse"></div>
        <div className="flex-grow flex flex-col md:flex-row gap-3">
          <div className="bg-base-200 md:w-1/3 rounded-2xl h-56 animate-pulse"></div>
          <div className="md:max-h-[410px] md:w-2/3 rounded-2xl bg-base-200 animate-pulse"></div>
        </div>
      </div>
    )
  }

  if (subjectError) {
    return <div>Error: {subjectError.message}</div>
  }

  return (
    <div className="min-h-[calc(100vh-94px)] flex flex-col gap-3">
      <div className="min-h-48 rounded-2xl">
        <div className="card card-compact image-full">
          <figure className="bg-cover bg-center max-h-48">
            {!imageLoaded && (
              <div className="w-full h-full bg-gray-200 animate-pulse"></div>
            )}
            <img
              src={randomImageUrl}
              alt={localSubject?.subjectName}
              className={`w-full ${imageLoaded ? 'block' : 'hidden'}`}
              onLoad={() => setImageLoaded(true)}
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
        <div className=" md:w-1/3 rounded-2xl  ">
          <div className="collapse  md:collapse-open row-start-2 col-span-3 md:col-span-1 bg-base-200 text-center rounded-2xl">
            <input type="checkbox" />
            <div className="collapse-title flex justify-between items-center px-5">
              <h1 className=" text-xl font-semibold rounded-2xl text-left">
                Notas
              </h1>
              <button className="btn btn-primary btn-sm ">Añadir Nota</button>
            </div>
            <div className="collapse-content ">
              <NotesList />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:max-h-[410px] md:w-2/3 rounded-2xl bg-base-200 ">
          <div className="text-start text-xl bg-base-200 rounded-2xl p-4 px-5 font-semibold justify-between flex ">
            Tareas
            <button
              className="btn btn-sm btn-primary"
              onClick={() => document.getElementById('modal').showModal()}
            >
              Añadir Tarea
            </button>
          </div>
          <div className="flex flex-col md:overflow-y-auto gap-2 p-2 rounded-2xl h-full">
            {localActivities.length === 0 ? (
              <h1 className="p-5 text-center">No hay tareas</h1>
            ) : (
              localActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="p-3 bg-base-100 rounded-lg text-start flex justify-between items-center"
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
                        className="btn btn-ghost btn-circle btn-sm mb-1"
                      >
                        <HiDotsVertical />
                      </div>

                      <ul
                        tabIndex="0"
                        className="dropdown-content z-[1] join join-vertical shadow bg-base-200 rounded-box w-28"
                      >
                        <button className="btn flex  join-item min-h-fit">
                          <MdEdit className="text-lg" />
                          Editar
                        </button>
                        <button className="btn join-item">
                          <MdDelete />
                          Eliminar
                        </button>
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
