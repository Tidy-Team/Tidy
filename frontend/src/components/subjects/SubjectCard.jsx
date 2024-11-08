//React
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'

//Icons
import { FaChalkboardTeacher } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'
import { MdDelete, MdModeEdit } from 'react-icons/md'

export function SubjectCard({
  id,
  title,
  description,
  teacher,
  onEdit,
  onDelete,
}) {
  const navigate = useNavigate()
  const randomImageUrl = `https://picsum.photos/seed/${id}/620/366`
  const [imageLoaded, setImageLoaded] = useState(false)

  const { fetchData: deleteSubject } = useFetch(
    `http://localhost:3000/subjects/${id}`,
    'DELETE'
  )

  const handleDelete = async (e) => {
    e.stopPropagation()
    await deleteSubject()
    onDelete(id)
  }

  return (
    <div
      className="card card-bordered card-compact image-full w-full sm:w-80 bg-base-200 hover:shadow-lg cursor-pointer transition-all"
      onClick={() => navigate(`/subjects/${id}`)}
    >
      <figure className="relative">
        {!imageLoaded && <div className=" h-[187.95px] skeleteon"></div>}
        <img
          src={randomImageUrl}
          alt={title}
          className={`w-full ${imageLoaded ? 'block' : 'hidden'}`}
          onLoad={() => setImageLoaded(true)}
        />
      </figure>
      <div
        className={`card-body transition-opacity duration-500 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div>
          <h2 className="card-title justify-between">
            {title}
            <div className="dropdown dropdown-left">
              <div
                tabIndex="0"
                role="button"
                className="btn text-xl btn-circle btn-ghost "
                onClick={(e) => e.stopPropagation()}
              >
                <HiDotsVertical />
              </div>
              <ul
                tabIndex="0"
                className="dropdown-content !absolute z-50 menu p-2 shadow bg-base-200 rounded-box text-base-content"
                onClick={(e) => e.stopPropagation()}
              >
                <li>
                  <a
                    onClick={(e) => {
                      e.stopPropagation()
                      onEdit(id)
                    }}
                  >
                    <MdModeEdit className="text-xl" />
                    Edit
                  </a>
                </li>
                <li>
                  <a onClick={handleDelete}>
                    <MdDelete className="text-xl" />
                    Delete
                  </a>
                </li>
              </ul>
            </div>
          </h2>
        </div>
        <p>{description}</p>
        <div className="flex gap-3">
          <FaChalkboardTeacher className="text-2xl self-center" />
          <h3 className="font-semibold text-base ">{teacher}</h3>
        </div>
      </div>
    </div>
  )
}
