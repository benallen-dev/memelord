import { createServerFn } from '@tanstack/react-start'
import { readdirSync, statSync } from 'fs'
import { join } from 'path'

const dataDir = 'public/memes/';

export const getMemeFiles = createServerFn(
	{method: 'GET' }).handler(
  async () => {
    const files = readdirSync(dataDir)
    return files.map(file => {
      const stat = statSync(join(dataDir, file))
      return {
        name: file,
        path: `memes/${file}`,
        isDirectory: stat.isDirectory(),
        size: stat.size,
        modified: stat.mtime
      } as MemeFile;
    })
  }
)
