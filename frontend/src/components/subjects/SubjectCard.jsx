//React
import { useNavigate } from 'react-router-dom'

//Icons
import { FaChalkboardTeacher } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'

export function SubjectCard({ id, title, description, teacher }) {
  const navigate = useNavigate()
  const randomImageUrl = `https://picsum.photos/seed/${id}/620/366`

  return (
    <div
      className="card card-bordered card-compact image-full w-full sm:w-80 bg-base-200 hover:shadow-lg cursor-pointer transition-all"
      onClick={() => navigate(`/subjects/${id}`)}
    >
      <figure>
        <img src={randomImageUrl} alt={title} />
      </figure>
      <div className="card-body">
        <div>
          <h2 className="card-title justify-between">
            {title}
            <div className="dropdown dropdown-right">
              <div
                tabIndex="0"
                role="button"
                className="btn text-xl btn-circle   btn-ghost "
                onClick={(e) => e.stopPropagation()}
              >
                <HiDotsVertical />
              </div>
              <ul
                tabIndex="0"
                className="dropdown-content !absolute !z-[70] menu p-2 shadow bg-base-200 rounded-box"
                onClick={(e) => e.stopPropagation()}
              >
                <li>
                  <a>Edit</a>
                </li>
                <li>
                  <a>Delete</a>
                </li>
              </ul>
            </div>
          </h2>
        </div>
        <p>{description}</p>
        <div className="flex gap-3">
          <FaChalkboardTeacher className=" text-2xl self-center" />
          <h3 className="font-semibold text-base ">{teacher}</h3>
        </div>
      </div>
    </div>
  )
}
