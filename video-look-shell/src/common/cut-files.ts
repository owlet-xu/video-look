import { getFilesPath, renameSync } from './file-utils';
import path from 'path';
import readline from 'readline';

/**
 * 将源文件夹所有文件拷贝到目标文件夹
 * @param sourcePath 源文件夹
 * @param targetPath 目标文件夹
 */
export const cutFilesToOnePath = (sourcePath: string, targetPath: string) => {
    const files1 = getFilesPath(sourcePath);
    let index = 0;
    files1.forEach((item: string) => {
        const target = `${targetPath}${path.basename(item)}`;
        renameSync(item, target);
        ++index;
        logProcess(index);
    });
    console.log(`成功移动了${index}个文件！`);
};

/**
 * 替换名称
 * @param sourcePath 目录
 * @param oldWords
 * @param newWords
 */
export const replaceChars = (sourcePath: string, oldWords: string, newWords: string) => {
    const files1 = getFilesPath(sourcePath);
    let index = 0;
    files1.forEach((item: string) => {
        let newName = path.basename(item);
        newName = newName.replace(oldWords, newWords);
        const target = `${sourcePath}${newName}`;
        renameSync(item, target);
        ++index;
        logProcess(index);
    });
    console.log(`成功重命名了${index}个文件！`);
};

const logProcess = (index: number) => {
    readline.clearLine(process.stdout, 0);    // 移动光标到行首
    readline.cursorTo(process.stdout, 0, 0);
    process.stdout.write(`---${index}---`, 'utf-8');
};