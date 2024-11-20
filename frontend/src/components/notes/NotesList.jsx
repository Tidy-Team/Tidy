import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import { useEffect, useState } from 'react'

import { MdDelete, MdEdit } from 'react-icons/md'
import { HiDotsVertical } from 'react-icons/hi'

export const NotesList = ({ notes }) => {
  const { id } = useParams()

  const {
    fetchData,
    data: fetchedNotes,
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
    if (fetchedNotes) {
      setLocalNotes((prevNotes) => [
        ...fetchedNotes.Notes.reverse(),
        ...prevNotes,
      ])
    }
  }, [fetchedNotes])

  useEffect(() => {
    if (notes) {
      setLocalNotes((prevNotes) => [...notes, ...prevNotes])
    }
  }, [notes])

  if (isLoading) {
    return (
      <div className="flex justify-center mx-auto">
        <span className="loading loading-spinner self-center loading-sm"></span>
      </div>
    )
  }

  return (
    <div>
      {localNotes.length === 0 && (
        <div className="flex justify-center items-center h-0"></div>
      )}
      {localNotes.map((note) => {
        return (
          <div
            className="flex items-center pb-3 overflow-visible"
            key={note.id} // Ensure each note has a unique key
          >
            <p className="text-left w-full text-wrap">- {note.description}</p>
            <div className="dropdown dropdown-left !z-[80]">
              <div
                tabIndex="0"
                role="button"
                className="btn btn-ghost btn-circle btn-sm mb-1"
              >
                <HiDotsVertical />
              </div>

              <ul
                tabIndex="0"
                className="dropdown-content z-[1] join join-vertical shadow bg-base-100 rounded-box w-28"
              >
                <button className="btn btn-ghost flex join-item min-h-fit">
                  <MdEdit className="text-lg" />
                  Editar
                </button>
                <button className="btn btn-ghost join-item">
                  <MdDelete />
                  Eliminar
                </button>
              </ul>
            </div>
          </div>
        )
      })}
    </div>
  )
}
