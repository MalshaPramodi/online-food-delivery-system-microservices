import type { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getRedirectPath, useAuth } from './AuthContext'
import type { UserRole } from './AuthContext'

type RequireAuthProps = PropsWithChildren<{
  allowedRoles?: UserRole[]
}>

export function RequireAuth({ allowedRoles, children }: RequireAuthProps) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={getRedirectPath(user.role)} replace />
  }

  return children
}
