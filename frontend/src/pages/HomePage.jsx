//React
import { useEffect, useState } from 'react'

//Components and utilities
import { useFetch } from '../hooks/useFetch.js'
import { SubjectCard, SubjectForm, Modal } from '../components'
import { BiPlus } from 'react-icons/bi'

export function HomePage() {
  const {
    fetchData,
    data: subjects,
    error,
    isLoading,
  } = useFetch(
    'http://localhost:3000/subjects',
    'GET',
    { 'Content-Type': 'application/json' },
    { credentials: 'include' }
  )

  const [localSubjects, setLocalSubjects] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (subjects) {
      setLocalSubjects(subjects)
      setDataLoaded(true)
    }
  }, [subjects])

  const addSubject = (newSubject) => {
    const subjectData = newSubject
    setLocalSubjects([...localSubjects, subjectData])
  }

  const handleEdit = (id) => {}

  const handleDelete = (id) => {
    setLocalSubjects((prevSubjects) =>
      prevSubjects.filter((subject) => subject.id !== id)
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center min-h-[calc(100vh-94px)] w-full">
        <span className="loading loading-spinner self-center loading-lg"></span>
      </div>
    )
  }

  return (
    <>
      <div className="bg-base-100">
        {dataLoaded && localSubjects.length === 0 && (
          <div className="flex justify-center items-center p-10 m-10">
            <div>Vacio</div>
          </div>
        )}

        <div className="flex flex-wrap gap-5 m-5 max-h-svh">
          <div
            className="card card-compact   h-[187.95px] sm:w-80  hover:shadow-lg cursor-pointer w-full rounded-2xl border-primary border-4 border-dashed hover:border-primary/50 text-primary hover:text-primary/50 hover:scale-95 transition-all "
            onClick={() => document.getElementById('modal').showModal()}
          >
            <div className="flex flex-col h-full text-center justify-center p-5 md:p-0">
              <BiPlus className="text-5xl text-center self-center" />
              <h1 className="text-lg font-semibold ">Añadir materia</h1>
            </div>
          </div>

          {localSubjects.map((subject) => {
            if (!subject.id) {
              console.warn('Skipping subject with undefined id:', subject)
              return null
            }
            return (
              <SubjectCard
                key={subject.id}
                id={subject.id}
                title={subject.subjectName}
                description={subject.description}
                teacher={subject.name_teacher}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )
          })}
        </div>
      </div>
      <Modal
        children={<SubjectForm addSubject={addSubject} />}
        tooltip={'Añadir Materia'}
      />
    </>
  )
}
