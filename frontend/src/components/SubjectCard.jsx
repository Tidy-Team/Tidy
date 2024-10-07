//React
import { useNavigate } from 'react-router-dom'

//Icons
import { FaChalkboardTeacher } from 'react-icons/fa'

export function SubjectCard({ id, title, description, teacher }) {
  const navigate = useNavigate()

  return (
    <div
      className="card card-compact bg-base-200 shadow-xl cursor-pointer"
      onClick={() => navigate(`/subjects/${id}`)}
    >
      <figure>
        <div className="h-48 w-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="flex  gap-3">
          <FaChalkboardTeacher className=" text-2xl self-center" />
          <h3 className="font-semibold text-base ">{teacher}</h3>
        </div>
      </div>
    </div>
  )
}
