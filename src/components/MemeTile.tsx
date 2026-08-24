import { formatFileSize } from "#/lib/format-filesize";
import type { MemeFile } from "#/server-functions/readDir";

interface MemeTileProps {
	mf: MemeFile;
}

export function MemeTile({ mf }: MemeTileProps) {
	const tooltip = `${mf.modified.toLocaleString("nl-NL")} · ${formatFileSize(mf.size)}`;

	return (
		<div
			title={tooltip}
			className="aspect-square flex flex-col overflow-hidden bg-white p-6 rounded-lg shadow-md border border-gray-200"
		>
			<p className="font-bold text-lg mb-2 truncate" title={mf.name}>
				{mf.name}
			</p>
			<img
				src={mf.path}
				alt={mf.name}
				loading="lazy"
				className="flex-1 min-h-0 w-full object-contain"
			></img>
		</div>
	);
}
