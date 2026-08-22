import type { MemeFile } from "#/server-functions/readDir.types"

import { MemeTile } from "./MemeTile"

interface MemeFilesProps {
  files: MemeFile[]
}

export function MemeFiles({ files }: MemeFilesProps) {
  if (!files || files.length === 0) {
    return <p className="text-gray-500 italic">No files found. Add some!</p>
  }

  return (
    <div className="grid grid-cols-5 gap-6 items-start">
      {files.map((file) => <MemeTile key={file.name} mf={file} />)}
    </div>
  )
}
