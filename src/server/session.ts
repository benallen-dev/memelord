import { useSession as useStartSession } from '@tanstack/react-start/server'
import { createServerOnlyFn } from '@tanstack/react-start';

import type { Session } from "#/schemas/session";

export const useSession = createServerOnlyFn(() => {
	return useStartSession<Session>({
		// Session configuration
		name: 'app-session',
		password: process.env.SESSION_SECRET!, // At least 32 characters
		// Optional: customize cookie settings
		cookie: {
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			httpOnly: true,
		},
	})
});
