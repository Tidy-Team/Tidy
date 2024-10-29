import { useNavigate, useParams } from 'react-router-dom'

export const ActivityTimer = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  return <div>{id}</div>
}
