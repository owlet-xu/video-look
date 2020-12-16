import fs from 'fs';
import path from 'path';
import FfmpegCommand from 'fluent-ffmpeg';

let allfilePath: Map<string, string> = new Map(); // 视频文件
let threadCount: number; // 处理的视频数量

export const doFiles = (mypath: string) => {
    threadCount = 0;
    allfilePath = new Map();
    if (!mypath) {
        mypath = './';
    }
    findFiles(mypath);
    console.log([...allfilePath.keys()], `---读取到${allfilePath.size}个文件---`);
    setInterval(() => {
        if (threadCount > 1) {
            return;
        }
        if (allfilePath.size > 0) {
            const key: string = [...allfilePath.keys()][0];
            console.log(`---开始处理${key}---`);
            console.log(`---还剩${allfilePath.size - 1}个---`);
            if (isVideoFile(key)) {
                getVideoTotalDuration(key);
            }
            allfilePath.delete(key);
        } else {
            console.log(`---处理完毕---`);
        }
    }, 5000);
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
        // console.log(stats, '---isDirectory---'); // 打印文件相关信息
        console.log(mypath, '---读取到目录---'); // 打印文件相关信息
        findFiles(mypath);
    } else if (stats.isFile()) {
        // console.log(stats, '---isFile---'); // 打印文件相关信息
        console.log(mypath, '---读取到文件---'); // 打印文件相关信息
        allfilePath.set(mypath, mypath);
    }
};

/**
 * 是否需要处理的视频
 */
const isVideoFile = (mypath: string) => {
    if (mypath.indexOf('-priview.mp4') !== -1) {
        return false;
    }
    if (mypath.indexOf('.mp4') > -1 || mypath.indexOf('.mkv') > -1) {
        return true;
    }
    if (mypath.indexOf('.avi') > -1 || mypath.indexOf('.wmv') > -1) {
        return true;
    }
    return false;
};

// 获取视频时长
const getVideoTotalDuration = (videoPath: string) => {
    FfmpegCommand.ffprobe(videoPath, (error: any, metadata: any) => {
        const duration = metadata.format.duration;
        console.log(duration, '---读取到视频时长---');
        getGif(videoPath, duration);
    });
};

/**
 * 保存成gif
 * @param {*} videoPath
 * @param {*} duration
 */
const getGif = (videoPath: string, duration: number) => {
    const startEnd = getVideoStartEnd(duration);
    FfmpegCommand(videoPath).inputOptions([
        '-ss ' + startEnd.start, // 搜索到指定的时间 [-]hh:mm:ss[.xxx]的格式也支持
        '-t ' + startEnd.end // 设置纪录时间 hh:mm:ss[.xxx]格式的记录时间也支持
    ]).outputOptions([
        '-vf setpts=0.01*PTS', // 快进
        '-an',
        '-f mp4', // 强制转到格式
        '-r 1' // 要强制输出文件的帧频为1 fps
    ]).on('start', (cmd: any) => {
        console.log(cmd, '---start---');
        ++ threadCount;
    }).on('progress', (progress: any) => {
        // console.log(progress.percent, '---progress---');
    }).on('end', () => {
        console.log('---end---');
        -- threadCount;
    }).save(getGifPath(videoPath));
};

/**
 * 通过视频videoPath获取gifPath
 * @param {*} videoPath
 */
const getGifPath = (videoPath: string) => {
    const extname = path.extname(videoPath); // 后缀名
    return videoPath.replace(extname, '-PREVIEW.mp4'); // gif路径
};

/**
 * 获取视频时间段
 * @param {*} duration
 */
const getVideoStartEnd = (duration: number) => {
    let startEnd = { start: 0, end: duration };

    if (duration > 3600) { // 60分钟以上
        startEnd.start = 600; // 10分钟
        startEnd.end = 3000; // 50分钟
    } else if (duration > 2400) { // 40分钟以上
        startEnd.start = 300; // 5分钟
        startEnd.end = 1800; // 30分钟
    } else if (duration > 1800) { // 30分钟以上
        startEnd.start = 300; // 5分钟
        startEnd.end = 1200; // 20分钟
    }
    return startEnd;
};