//React
import { useEffect, useState } from 'react'

//Components and utilities
import { useFetch } from '../hooks/useFetch.js'
import { SubjectCard, SubjectForm, Modal } from '../components'

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

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (subjects) {
      setLocalSubjects(subjects)
    }
  }, [subjects])

  const addSubject = (newSubject) => {
    const subjectData = newSubject
    setLocalSubjects([...localSubjects, subjectData])
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="bg-base-100">
        {localSubjects.length === 0 && (
          <div className="flex justify-center items-center p-10 m-10">
            <div>Vacio</div>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 m-5 max-h-svh ">
          {localSubjects.map((subject) => {
            if (!subject.id) {
              console.warn('Skipping subject with undefined id:', subject)
              return null
            }
            return (
              <SubjectCard
                key={subject.id} // Ensure each SubjectCard has a unique key
                id={subject.id}
                title={subject.subjectName}
                description={subject.description}
                teacher={subject.name_teacher}
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
