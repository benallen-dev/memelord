import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { createServerFn } from "@tanstack/react-start";
import { memeDir } from "#/constants/dirs";
import type { MemeFile } from "#/schemas/meme-file";

export const getMemeFiles = createServerFn({ method: "GET" }).handler(
	async () => {
		const files = readdirSync(memeDir);
		return files.map((file) => {
			const stat = statSync(join(memeDir, file));
			// todo: deal with directories. Or not. But choose one.
			return {
				name: file,
				path: `memes/${file}`,
				isDirectory: stat.isDirectory(),
				size: stat.size,
				modified: stat.mtime,
			} as MemeFile;
		});
	},
);
