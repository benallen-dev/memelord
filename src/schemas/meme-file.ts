import { z } from "zod";

export const MemeFileSchema = z.object({
	name: z.string(),
	isDirectory: z.boolean(),
	size: z.number(),
	modified: z.date(),
	path: z.string(),
});

export type MemeFile = z.infer<typeof MemeFileSchema>;

