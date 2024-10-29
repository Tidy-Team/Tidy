//React
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

//Components and utilities
import { useFetch } from '../hooks/useFetch.js'
import { Modal, ActivityForm, ActivitiesList } from '../components'

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

  return (
    <div className="max-h-[calc(100vh-94px)] flex flex-col gap-2">
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
      <div className="flex-grow flex flex-col md:flex-row gap-2">
        <div className="bg-blue-600 md:w-1/3 rounded-lg h-fit">
          <div className="collapse  md:collapse-open row-start-2 col-span-3 md:col-span-1 bg-base-200 text-center rounded-md">
            <input type="checkbox" />
            <h1 className="collapse-title  text-xl font-semibold bg-base-200 rounded-md px-0">
              Notas
            </h1>
            <div className="collapse-content">
              <div>
                <button className="btn btn-primary ">Agregar nota</button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 max-h-[410px] md:w-2/3 rounded-lg  ">
          <div className="text-center text-xl bg-base-200 rounded-lg p-4 font-semibold ">
            Tareas
          </div>
          <div className="flex flex-col md:overflow-y-auto gap-2  p-1 rounded-lg ">
            {localActivities.length === 0 ? (
              <h1 className="p-5 text-center">No hay tareas</h1>
            ) : (
              localActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="p-3  bg-base-200  rounded-lg text-start flex justify-between items-center"
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

    // <div className="grid grid-cols-3 gap-4 md:h-[calc(100vh-90px)] max-h-full">
    //   <div className="col-span-3">
    //
    //   </div>
    //   <div className="collapse row-start-2 col-span-3 md:col-span-1 bg-base-300 text-center rounded-md  max-h-40">
    //     <input type="checkbox" />
    //     <h1 className="collapse-title text-2xl font-semibold bg-base-300 rounded-md">
    //       Notas
    //     </h1>
    //     <div class="collapse-content">
    //       <div className="divider m-0"></div>
    //       <div>
    //         <button className="btn btn-primary btn-wide">Agregar nota</button>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="col-span-3 md:col-span-2 row-span-2 row-start-3 md:row-start-2 text-center  min-h-fit">
    //     <div>
    //       <h1 className="text-2xl font-semibold bg-base-300 rounded-md p-3 mb-2">
    //         Tareas
    //       </h1>
    //     </div>
    //     <div className="h-fit flex flex-col gap-2 md:mb-5 max-h-screen">
    //       {/* Activities */}
    //       {localActivities.length === 0 ? (
    //         <h1 className="p-5">No hay tareas</h1>
    //       ) : (
    //         localActivities.map((activity) => (
    //           <div
    //             key={activity.id}
    //             className="p-3 bg-base-300 rounded-lg text-start flex justify-between items-center"
    //           >
    //             {activity.titulo}
    //             <div className="flex items-center gap-3">
    //               <button
    //                 className="btn btn-sm btn-primary btn-circle"
    //                 onClick={() => {
    //                   console.log(activity.id)
    //                 }}
    //               ></button>
    //               <div className="dropdown dropdown-left">
    //                 <div
    //                   tabIndex="0"
    //                   role="button"
    //                   className="btn btn-circle btn-sm mb-1"
    //                 >
    //                   <HiDotsVertical />
    //                 </div>

    //                 <ul
    //                   tabIndex="0"
    //                   className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box"
    //                 >
    //                   <li>
    //                     <a>Edit</a>
    //                   </li>
    //                   <li>
    //                     <a>Delete</a>
    //                   </li>
    //                 </ul>
    //               </div>
    //             </div>
    //           </div>
    //         ))
    //       )}
    //     </div>
    //   </div>
    //   <Modal children={<ActivityForm addActivity={addActivity} />} />
    // </div>
  )
}
