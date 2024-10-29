import { useAuth } from '../hooks/useAuth.js'

export const ProfilePage = () => {
  const { user } = useAuth()

  return <div>{user.name}</div>
}
