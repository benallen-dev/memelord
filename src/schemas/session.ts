import { z } from "zod";

export const SessionSchema = z.object({
	userId: z.uuidv4(),
});

export type Session = z.infer<typeof SessionSchema>;

