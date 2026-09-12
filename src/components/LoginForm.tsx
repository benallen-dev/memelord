import type { SubmitEvent } from "react";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";

import { z } from 'zod';

import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { login } from "#/server-functions/auth";

const { fieldContext, formContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
	fieldComponents: {
		Input,
	},
	formComponents: {
		Button
	},
	fieldContext,
	formContext,
});

export function LoginForm() {
	const form = useAppForm({
		defaultValues: {
			username: '',
			password: '',
		},
		validators: {
			onChange: z.object({
				username: z.email(),
				password: z.string().min(8),
			}),
		},
		onSubmit: async ({ value }) => {
			alert("submitting");
			const res = await login({ data: value })
			alert(JSON.stringify(res, null, 2));


			console.dir(value);
		},
	});

	function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		form.handleSubmit();
	}

	return <form onSubmit={handleSubmit} className="grid gap-4">
		<form.AppField
			name="username"
			
			children={(field) => <div><field.Input onChange={(e) => field.handleChange(e.target.value)} type="email" placeholder="email"/></div>}
		/>
		<form.AppField
			name="password"
			children={(field) => <div><field.Input onChange={(e) => field.handleChange(e.target.value)} type="password" placeholder="password"/></div>}
		/>
		<form.AppForm>
			<form.Button type="submit">Login</form.Button>
		</form.AppForm>
	</form>
}
