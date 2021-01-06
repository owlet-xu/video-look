import fs from 'fs';
import path from 'path';

let files: string[] = [];

/**
 * 获取文件夹的所有文件
 * @param path 
 */
export const getFilesPath = (path: string) => {
    files = [];
    findFiles(path);
    return files;
};

/**
 * 复制文件
 * @param src 
 * @param dest 
 */
export const copyFileSync = (src: string, dest: string) => {
    fs.copyFileSync(src, dest);
};

/**
 * 剪切文件
 */
export const renameSync = (oldPath: string, newPath: string) => {
    fs.renameSync(oldPath, newPath);
}

/**
 * 搜索文件夹文件 不区分大小写，空格分词
 * @param src
 * @param keyWord
 */
export const searchPath = (src: string, keyWords: string): any[] => {
    const keyWordss: string[] = keyWords.split(' ');
    const files = getFilesPath(src);
    const res: any[] = [];
    files.forEach((item: string) => {
        const basename = path.basename(item);
        if (keyWordss.every(key => isMatch(basename, key))) {
            res.push({path: item});
        }
    });
    return res;
}

const getSimpleName = (str: string) => {
    return str.toLocaleLowerCase();
}

const isMatch = (str1: string, str2: string) => {
    return getSimpleName(str1).indexOf(getSimpleName(str2)) > -1;
}

/**
 * 传入一个文件路径，遍历路径下的文件和文件夹
 * @param {*} mypath
 */
const findFiles = (mypath: string) => {
    const files = fs.readdirSync(mypath); // 同步写法
    files.forEach((filename: string) => {
        // 获取当前文件的绝对路径
        const filedir = path.join(mypath, filename);
        findPath(filedir);
    });
};

/**
 * 判断路径是文件还是文件夹
 * @param {*} mypath
 */
const findPath = (mypath: string) => {
    const stats = fs.statSync(mypath);
    if (stats.isDirectory()) {
        findFiles(mypath);
    } else if (stats.isFile()) {
        files.push(mypath);
    }
};