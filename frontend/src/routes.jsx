import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'

export const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useAuth()
  if (loading) {
    return (
      <div className=" flex justify-center min-h-[calc(100vh-94px)] w-full">
        <span className="loading loading-spinner self-center loading-lg"></span>
      </div>
    )
  }

  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}
