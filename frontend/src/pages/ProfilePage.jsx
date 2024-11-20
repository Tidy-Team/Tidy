import { useAuth } from '../hooks/useAuth.js'
import Avatar from 'boring-avatars'
import { useFetch } from '../hooks/useFetch.js'

export const ProfilePage = () => {
  const { user } = useAuth()
  const { fetchData, data, error, isLoading } = useFetch(
    'http://localhost:3000/request-password-reset',
    'POST',
    { email: user.email }
  )

  const handlePasswordReset = () => {
    fetchData()
  }

  return (
    <div className="flex flex-col items-center p-6 min-h-[calc(100vh-94px)]">
      <div className="card w-96 bg-base-200 shadow-xl">
        <div className="card-body items-center text-center">
          <Avatar
            name={user.name}
            colors={['#d94052', '#ee7e4c', '#ead56c', '#94c5a5', '#898b75']}
            variant="beam"
            className="w-28 rounded-full "
          />
          <h2 className="card-title">{user.name}</h2>
          <p className="text-accent">{user.email}</p>
          <div className="card-actions justify-end mt-3">
            <button
              className="btn btn-primary"
              onClick={handlePasswordReset}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  Enviando...
                  <span className="loading loading-dots loading-md"></span>
                </>
              ) : (
                'Cambiar contraseña'
              )}
            </button>
          </div>
          {data && (
            <p className="text-success mt-2">
              {' '}
              Se envió el correo de reinicio de contraseña{' '}
            </p>
          )}
          {error && (
            <p className="text-error mt-2">
              {JSON.parse(error.message).data.message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
