//React
import { useEffect, useState } from 'react'

//Components and utilities
import { useSubjects } from '../context/useSubject.js'
import { SubjectCard, SubjectForm, Modal } from '../components'

export function HomePage() {
  const { subjects, getSubjects } = useSubjects()
  const [localSubjects, setLocalSubjects] = useState(subjects)

  useEffect(() => {
    getSubjects()
  }, [])

  useEffect(() => {
    console.log('Fetched subjects:', subjects) // Debugging statement
    const validSubjects = subjects.filter((subject) => subject.id !== undefined)
    if (validSubjects.length !== subjects.length) {
      console.warn('Some subjects have undefined id:', subjects)
    }
    setLocalSubjects(validSubjects)
  }, [subjects])

  const addSubject = (newSubject) => {
    console.log('New subject response:', newSubject) // Debugging statement
    const subjectData = newSubject.data.subject
    if (subjectData.id === undefined) {
      console.error('New subject has undefined id:', subjectData)
      return
    }
    setLocalSubjects([...localSubjects, subjectData])
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
            console.log('Rendering subject with id:', subject.id) // Debugging statement
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
