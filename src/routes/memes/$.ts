import { createReadStream, statSync } from "node:fs";
import { basename, extname, resolve, sep } from "node:path";
import { Readable } from "node:stream";
import { createFileRoute } from "@tanstack/react-router";

import { getMemeDir } from "#/lib/meme-dir";
import { MIME_BY_EXTENSION } from "#/lib/meme-filetypes";

interface ServeContext {
	request: Request;
	params: { _splat?: string };
}

function notFound() {
	return new Response(null, { status: 404 });
}

function decodeName(raw: string): string | null {
	try {
		return decodeURIComponent(raw);
	} catch {
		return raw;
	}
}

async function serveMeme({ request, params }: ServeContext, head = false) {
	const root = getMemeDir();

	if (!params._splat) {
		return notFound();
	}
	const name = decodeName(params._splat);

	if (!name || name.includes("\0") || basename(name).startsWith(".")) {
		return notFound();
	}

	const filePath = resolve(root, name);
	if (!filePath.startsWith(root + sep)) {
		return notFound();
	}

	let size: number;
	let mtimeMs: number;
	let isFile: boolean;
	try {
		const stat = statSync(filePath);
		size = stat.size;
		mtimeMs = stat.mtimeMs;
		isFile = stat.isFile();
	} catch {
		return notFound();
	}
	if (!isFile) {
		return notFound();
	}

	const contentType =
		MIME_BY_EXTENSION.get(extname(filePath).toLowerCase()) ??
		"application/octet-stream";
	const etag = `W/"${size}-${mtimeMs}"`;

	if (request.headers.get("if-none-match") === etag) {
		return new Response(null, { status: 304, headers: { etag } });
	}

	const body = head
		? null
		: (Readable.toWeb(createReadStream(filePath)) as ReadableStream);

	return new Response(body, {
		status: 200,
		headers: {
			"content-type": contentType,
			"content-length": String(size),
			"cache-control": "no-cache",
			etag,
		},
	});
}

export const Route = createFileRoute("/memes/$")({
	server: {
		handlers: {
			GET: (ctx) => serveMeme(ctx),
			HEAD: (ctx) => serveMeme(ctx, true),
		},
	},
});
