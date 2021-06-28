import fs from 'fs';
import path from 'path';
import { shell } from 'electron';

let videos: string[] = []; // 所有视频文件
let chineses: string[] = []; // 所有字幕文件
let matchs: { vname: string, cname: string, match: string }[] = []; // 匹配成功的文件
let currType: 'video' | 'chinese' = 'chinese';

export const showItemInFolder = (pathTemp: string) => {
    shell.showItemInFolder(pathTemp);
};

export const matchChinese = async (pathChinese: string, pathVideo: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        videos = [];
        chineses = [];
        matchs = [];
        currType = 'chinese';
        findFiles(pathChinese);
        // console.log(chineses, '---chineses---');
        currType = 'video';
        findFiles(pathVideo);
        // console.log(chineses, '---videos---');
        compareNames();
        resolve(matchs);
    });
};

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
        if (currType === 'video' && isVideoFile(mypath)) {
            videos.push(mypath);
        } else if (currType === 'chinese') {
            chineses.push(mypath);
        }
    }
};

const compareNames = () => {
    videos.forEach((vname: string) => {
        const match = isMatch(vname);
        match.cname && matchs.push({ vname, cname: match.cname, match: match.match });
    });
};

/**
 * 匹配
 * @param videoPath
 */
const isMatch = (videoPath: string): { cname: string | undefined, match: string } => {
    const vname = subExtra(path.basename(videoPath)); // 视频名称
    let match = ''; // 匹配上的字母
    const cname = chineses.find((p) => {
        const ps = getAvCard(p); // 车牌解析
        return ps.findIndex((cname2: string) => {
            cname2 = subExtra(cname2); // 去-，后最等
            if (cname2.length > 3 && vname.indexOf(cname2) > -1) {
                match = cname2;
                return true;
            } else {
                return false;
            }
        }) > -1;
    });
    return { cname, match };
};

/**
 * 处理文件名，提取数字和字幕
 * @param p
 */
const getAvCard = (p: string) => {
    let temp = path.basename(p);
    temp = temp.replace(path.extname(temp), ''); // 去除后缀
    return temp.match(/[a-zA-Z0-9\-]+/g) || []; // 提取车牌
};

/**
 * 处理文件名，提取数字和字幕
 * @param p
 */
const subExtra = (p: string) => {
    const extname = path.extname(p);
    return p.replace(extname, '').replace('-', '').replace('_', '').replace(/[^a-zA-Z\d]/g, '').toLocaleLowerCase();
};

/**
 * 是否需要处理的视频
 */
const isVideoFile = (mypath: string) => {
    const lower = mypath.toLocaleLowerCase();
    const videsType = [
        '.rmvb',
        '.mp4',
        '.mkv',
        '.avi',
        '.wmv',
        '.mov',
        '.flv',
        '.dat'
    ];
    return videsType.findIndex((type: string) => lower.indexOf(type) > -1) > -1;
};