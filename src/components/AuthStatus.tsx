import { Route } from '../routes/__root'

import { useServerFn } from '@tanstack/react-start';
import { useRouter } from '@tanstack/react-router';
import { logout } from '#/server-functions/auth';


export function AuthStatus() {
  const { user } = Route.useRouteContext()
  const logoutFn = useServerFn(logout);
  const router = useRouter();

  const handleLogout = async () => {
    await logoutFn();
    await router.invalidate();
  }

  return user
    ? <span>{user.username} <span className="underline" onClick={handleLogout}>log out</span></span>
    : <a href="/login">click to log in</a>;
}
