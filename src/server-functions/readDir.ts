import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { createServerFn } from "@tanstack/react-start";
import type { MemeFile } from "#/server-functions/readDir.types";
import { memeDir } from "#/constants/dirs";

export const getMemeFiles = createServerFn({ method: "GET" }).handler(
	async () => {
		const files = readdirSync(memeDir);
		return files.map((file) => {
			const stat = statSync(join(memeDir, file));
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
