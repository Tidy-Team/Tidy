//React
import { useNavigate } from 'react-router-dom'

//Icons
import { FaChalkboardTeacher } from 'react-icons/fa'

export function SubjectCard({ id, title, description, teacher }) {
  const navigate = useNavigate()
  const randomImageUrl = `https://picsum.photos/seed/${id}/620/366`

  return (
    <div
      className="card card-bordered  image-full w-96  bg-base-200 hover:shadow-lg cursor-pointer"
      onClick={() => navigate(`/subjects/${id}`)}
    >
      <figure>
        <img src={randomImageUrl} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="flex gap-3">
          <FaChalkboardTeacher className=" text-2xl self-center" />
          <h3 className="font-semibold text-base ">{teacher}</h3>
        </div>
      </div>
    </div>
  )
}
