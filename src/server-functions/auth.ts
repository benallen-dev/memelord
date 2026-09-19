import { createServerFn } from '@tanstack/react-start';
import { redirect } from "@tanstack/react-router";
import { type User } from "#/schemas/user";
import { useSession } from '#/server/session';

import { z } from "zod";

import { setResponseStatus, } from '@tanstack/react-start/server'

// TODO: Move this to server/user.ts
const defaultUser: User = {
	id: "11111111-1111-4111-a111-111111111111",
	username: "ben@benallen.dev",
	password: "foobarbaz", // this should be salted but ok yeah
}

function authenticateUser(username: string, password: string): (User | null) {
	const user = getUserByUsername(username);
	if (user?.password === password) { // todo: actual crypto
		return user;
	}

	return null;
}

// TODO: User shouldn't always include their password but we're rolling our own auth for fun here
function getUserById(id: string) {
	if (id === defaultUser.id) {
		return defaultUser;
	}

	return null;
}

function getUserByUsername(username: string) {
	if (username === defaultUser.username) {
		return defaultUser;
	}

	return null;
}
// END TODO

export const login = createServerFn({ method: "POST" })
	.validator(
		z.object({
			username: z.email(),
			password: z.string().min(8)
		}))
	.handler(async ({ data }) => {

		// I can just feel the timing attacks I'm going to accidentally allow
		const user = authenticateUser(data.username, data.password);

		if (!user) {
			setResponseStatus(401);
			return { error: "Invalid credentials" };
		}

		// Create session
		const session = await useSession();
		await session.update({ userId: user.id });

		throw redirect({ to: '/' });
	});

export const logout = createServerFn({ method: "POST" }).handler(async () => {
	const session = await useSession();
	await session.clear();

	// throw redirect({ to: "/" });
});

export const getCurrentUser = createServerFn({ method: "GET" }).handler(
	async () => {
		const session = await useSession();

		const userId = session.data.userId

		if (!userId) {
			return null
		}

		const user = getUserById(userId);

		return user ? { id: user.id, username: user.username } : null;
	}
)
