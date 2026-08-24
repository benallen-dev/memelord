import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { createServerFn } from "@tanstack/react-start";

import { getMemeDir } from "#/lib/meme-dir";

export const getMemeFiles = createServerFn({ method: "GET" }).handler(
	async () => {
		const files = readdirSync(getMemeDir());
		return files.map((file) => {
			const stat = statSync(join(getMemeDir(), file));
			return {
				name: file,
				path: `memes/${file}`,
				isDirectory: stat.isDirectory(),
				size: stat.size,
				modified: stat.mtime,
			};
		});
	},
);

export type MemeFile = Awaited<ReturnType<typeof getMemeFiles>>[number];
