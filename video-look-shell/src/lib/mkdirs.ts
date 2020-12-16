import fs from 'fs';
import path from 'path';

export function mkDirs(targetDir: string, base: string = '') {
  const sep = path.sep;
  let dirs = targetDir;
  if (base) {
    dirs = targetDir.replace(base, '');
  }
  return dirs.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(parentDir, childDir);
    if (!fs.existsSync(curDir) || !fs.lstatSync(curDir).isDirectory()) {
      fs.mkdirSync(curDir);
    }
    return curDir;
  }, base);
}
