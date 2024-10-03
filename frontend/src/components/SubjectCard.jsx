import { useNavigate } from 'react-router-dom';

export function SubjectCard({ id, title, description, teacher }) {
  const navigate = useNavigate();

  return (
    <div className="card card-compact bg-base-100 shadow-xl" onClick={() => navigate(`/subjects/${id}`)}>
      <figure>
        <div className="h-48 w-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>

        <p>{teacher}</p>
      </div>
    </div>
  );
}
