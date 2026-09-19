import { Route } from '../routes/__root'

export function AuthStatus() {
  const { user } = Route.useRouteContext()

  return user
    ? <span>Logged in: {user.username}</span>
    : <a href="/login">click to log in</a>;
}
