import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import { useEffect, useState } from 'react'

export const NotesList = () => {
  const { id } = useParams()

  const {
    fetchData,
    data: notes,
    error,
    isLoading,
  } = useFetch(
    `http://localhost:3000/subject/${id}/note`,
    'GET',
    { 'Content-Type': 'application/json' },
    { credentials: 'include' }
  )

  const [localNotes, setLocalNotes] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (notes) {
      setLocalNotes(notes.Notes)
    }
  }, [notes])

  const addNote = (newNote) => {
    const noteData = newNote
    setLocalNotes([...localNotes, noteData])
  }

  return (
    <ul>
      {localNotes.length === 0 && (
        <div className="flex justify-center items-center p-10 m-10">
          <div>Vacio</div>
        </div>
      )}
      {localNotes.map((note) => {
        return <li>{note.description}</li>
      })}
    </ul>
  )
}
