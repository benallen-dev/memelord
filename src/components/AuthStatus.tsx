import { Route } from '../routes/__root'

import { useServerFn } from '@tanstack/react-start';
import { logout } from '#/server-functions/auth';


export function AuthStatus() {
  const { user } = Route.useRouteContext()
  const logoutFn = useServerFn(logout);

  return user
    ? <span>Logged in: {user.username} <span className="underline" onClick={() => logoutFn()}>log out</span></span>
    : <a href="/login">click to log in</a>;
}
