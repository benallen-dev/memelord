/**
 * Single source of truth for which file types count as memes.
 * Everything else (allowed mime types, extensions, accept attribute,
 * content-type lookup) is derived from this table.
 *
 * Ordered so the canonical extension for each mime type comes first
 * (`extensionForMimeType` returns the first match).
 */
export const MEME_FILE_TYPES = [
	{ extension: ".gif", mimeType: "image/gif" },
	{ extension: ".jpg", mimeType: "image/jpeg" },
	{ extension: ".jpeg", mimeType: "image/jpeg" },
	{ extension: ".png", mimeType: "image/png" },
	{ extension: ".webp", mimeType: "image/webp" },
] as const;

export const ALLOWED_MIME_TYPES = new Set<string>(
	MEME_FILE_TYPES.map((type) => type.mimeType),
);

export const MEME_EXTENSIONS = new Set<string>(
	MEME_FILE_TYPES.map((type) => type.extension),
);

export const UPLOAD_ACCEPT_ATTRIBUTE = [...ALLOWED_MIME_TYPES].join(",");

export const MIME_BY_EXTENSION = new Map<string, string>(
	MEME_FILE_TYPES.map((type) => [type.extension, type.mimeType]),
);

export function extensionForMimeType(mimeType: string): string | undefined {
	return MEME_FILE_TYPES.find((type) => type.mimeType === mimeType)?.extension;
}
