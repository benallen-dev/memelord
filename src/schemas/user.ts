import { z } from "zod";

export const UserSchema = z.object({
	id: z.uuidv4(),
	username: z.email(),
	password: z.string().min(8),
});

export type User = z.infer<typeof UserSchema>;

