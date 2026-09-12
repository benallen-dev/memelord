import type { MemeFile } from "#/schemas/meme-file";

import { formatFileSize } from "#/lib/format-filesize";

interface MemeTileProps {
	mf: MemeFile;
}

export function MemeTile({ mf }: MemeTileProps) {
	return (
		<div
			key={mf.name}
			className="max-w-80 bg-white p-6 rounded-lg shadow-md border border-gray-200"
		>
			<p className="font-bold text-lg mb-2">{mf.name}</p>
			<img src={mf.path} alt={mf.name}></img>
			<p className="text-gray-700">{mf.modified.toLocaleString("nl-NL")}</p>
			<p className="text-gray-700">{formatFileSize(mf.size)}</p>
		</div>
	);
}
