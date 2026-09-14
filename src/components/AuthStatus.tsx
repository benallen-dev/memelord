import { Route } from '../routes/__root'

export function AuthStatus() {
  const { user } = Route.useRouteContext()
  return <span>{user ? user.username : 'Signed out'}</span>
}
