import { app } from 'electron';
import path from 'path';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import { mkDirs } from '../lib/mkdirs';

const { combine, printf, timestamp } = winston.format;

// 用户数据目录
const userDataDir = app.getPath('userData');

// 用户目录下创建日志目录
const logDir = path.join(userDataDir, 'logs');

mkDirs(logDir, userDataDir);

// 单个日志文件大小
const MAX_SIZE = '200m';

// 保存日志文件数量
const MAX_FILES = '30d';

// 日志文件名
const LOGGER_FILE_NAME = '%DATE%.log';

const customLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5
};

const options = {
  level: 'info',
  dirname: logDir,
  filename: LOGGER_FILE_NAME,
  maxSize: MAX_SIZE,
  maxFiles: MAX_FILES
};

const transport = new DailyRotateFile(options);

const myFormat = printf(info => {
  return `${info.timestamp} [${info.level}]: ${info.message}`;
});

const logger = winston.createLogger({
  levels: customLevels,
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }), myFormat),
  transports: [transport]
});

export default logger;
