import type { MemeFile } from "#/server-functions/readDir.types";

import { MemeTile } from "./MemeTile";

interface MemeFilesProps {
	files: MemeFile[];
}

export function MemeFiles({ files }: MemeFilesProps) {
	if (!files || files.length === 0) {
		return <p className="text-gray-500 italic">No files found. Add some!</p>;
	}

	return (
		<div className="w-full grid grid-cols-[repeat(auto-fit,minmax(--spacing(80),1fr))] gap-6 items-start">
			{files.map((file) => (
				<MemeTile key={file.name} mf={file} />
			))}
		</div>
	);
}
