import { resolve } from "node:path";
import "@tanstack/react-start/server-only";

export function getMemeDir(): string {
	const configured = process.env.MEME_DIR ?? "memes";
	return resolve(process.cwd(), configured);
}
