const fs = require('fs');
const path = require('path');
var FfmpegCommand = require('fluent-ffmpeg');

// fs.readFile('readme.txt','utf8', (err, data) => {
//     console.log(data);
// });

findFiles('./video');

/**
 * 传入一个文件路径，遍历路径下的文件和文件夹
 * @param {*} mypath 
 */
function findFiles(mypath) {
    fs.readdir(mypath, function (err, files) {
        if (err) {
            console.log(err, 'fs.readdir错误');
            return;
        }
        files.forEach(function (filename) {
            //获取当前文件的绝对路径
            const filedir = path.join(mypath, filename);
            findPath(filedir);
        });
    });
}

/**
 * 判断路径是文件还是文件夹
 * @param {*} mypath 
 */
function findPath(mypath) {
    fs.stat(mypath, function (err, stats) {
        if (err) {
            console.log(err, 'fs.stat错误');
        }
        if (stats.isDirectory()) {
            // console.log(stats, '---isDirectory---'); //打印文件相关信息
            console.log(mypath, '---isDirectory---'); //打印文件相关信息
            findFiles(mypath);
        } else if (stats.isFile()) {
            // console.log(stats, '---isFile---'); //打印文件相关信息
            console.log(mypath, '---isFile---'); //打印文件相关信息
            if (mypath.indexOf('mp4') > -1) {
                getVideoTotalDuration(mypath);
            }
        }
    })
}

//获取视频时长
function getVideoTotalDuration(videoPath) {
    FfmpegCommand.ffprobe(videoPath, (error, metadata) => {
        const duration = metadata.format.duration;
        console.log(duration, 'duration');
        console.log(videoPath, 'videoPath');
        getGif(videoPath, duration);
    });
}

function getGif(videoPath, duration) {
    FfmpegCommand(videoPath).inputOptions([
        '-ss 20', // 搜索到指定的时间 [-]hh:mm:ss[.xxx]的格式也支持
        '-t 10' // 设置纪录时间 hh:mm:ss[.xxx]格式的记录时间也支持
    ]).outputOptions([
        '-s 320x240', // 分辨率
        '-f gif', // 强制转到格式
        '-r 1' // 要强制输出文件的帧频为1 fps
    ]).on('start', function (cmd) {
        console.log(cmd, '---start---');
    }).on('progress', function (progress) {
        console.log(progress.percent, '---progress---');
    }).on('end', function () {
        console.log('---end---');
    }).save(getGifPath(videoPath));
}

/**
 * 通过视频videoPath获取gifPath
 * @param {*} videoPath 
 */
function getGifPath(videoPath) {
    const extname = path.extname(videoPath); // 后缀名
    return videoPath.replace(extname, '.gif'); // gif路径
}

function getVideoStartEnd(duration) {
    let startEnd = {start: 0, end: 0};
}