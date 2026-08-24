// Todo: re-write this vibe-coded file so I know wtf is going on

import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { createServerFn } from "@tanstack/react-start";
import { memeDir } from "#/constants/dirs";

const allowedMimeTypes = new Set([
	"image/png",
	"image/jpeg",
	"image/gif",
	"image/webp",
]);

const imageExtensions = [".png", ".jpg", ".jpeg", ".gif", ".webp"];

const extensionByMimeType = new Map([
	["image/png", ".png"],
	["image/jpeg", ".jpg"],
	["image/gif", ".gif"],
	["image/webp", ".webp"],
]);

function sanitizeBaseName(name: string) {
	return name
		.normalize("NFKD")
		.replace(/[^\w.-]+/g, "-")
		.replace(/^[.-]+|[.-]+$/g, "")
		.slice(0, 80);
}

function resolveExtension(base: string, file: File) {
	if (imageExtensions.includes(extname(base).toLowerCase())) {
		return "";
	}
	const fromOriginal = extname(file.name).toLowerCase();
	if (imageExtensions.includes(fromOriginal)) {
		return fromOriginal;
	}
	return extensionByMimeType.get(file.type) ?? "";
}

export const uploadMeme = createServerFn({ method: "POST" })
	.validator((data: unknown) => {
		if (!(data instanceof FormData)) {
			throw new Error("Expected multipart form data");
		}
		const file = data.get("file");
		if (!(file instanceof File) || file.size === 0) {
			throw new Error("Please choose an image to upload");
		}
		if (!allowedMimeTypes.has(file.type)) {
			throw new Error("Only PNG, JPG, GIF and WebP images are allowed");
		}
		return {
			file,
			fileName: data.get("fileName")?.toString() ?? "",
		};
	})
	.handler(async ({ data }) => {
		const base = sanitizeBaseName(data.fileName) || data.file.name;
		const fileName = `${base}${resolveExtension(base, data.file)}`;
		const targetPath = join(memeDir, fileName);
		if (existsSync(targetPath)) {
			throw new Error(`"${fileName}" already exists`);
		}
		await writeFile(targetPath, Buffer.from(await data.file.arrayBuffer()));
		return { name: fileName, path: `memes/${fileName}` };
	});
