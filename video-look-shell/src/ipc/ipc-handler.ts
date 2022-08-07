import { ipcMain } from 'electron';

import logger from '../common/logger';
import { eventQueue } from './event-queue';
import { IpcEventType } from './ipc-event-type';
import { closeMainWindow, getMainWindow } from '../ui/main-window';
import { doFiles } from '../common/video-preview';
import { matchChinese, showItemInFolder } from '../common/match-chinese';
import { searchPath, findRepeat } from '../common/file-utils';
import { cutFilesToOnePath, replaceChars } from '../common/cut-files';

export function startAllListeners() {
  ipcMain.on(IpcEventType.BASE.APP_EXIT, (event: any, args: any) => {
    closeMainWindow();
  });

  ipcMain.on(IpcEventType.BASE.SHOW_ITEM_IN_FOLDER, (event: any, args: any) => {
    const [path] = args;
    showItemInFolder(path);
  });

  ipcMain.on(IpcEventType.BASE.LOGIN_SUCCESS, (event: any, args: any) => {
    if (args) {
      const [
        userInfo,
        roleInfo,
        centerInfo,
        seatInfo,
        functionGroups,
        token,
        relatedDepatments
      ] = args;
      const g: any = global;
      g.userInfo = userInfo;
      g.roleInfo = roleInfo;
      g.centerInfo = centerInfo;
      g.seatInfo = seatInfo;
      g.functionGroups = functionGroups;
      g.token = token;
      g.relatedDepatments = relatedDepatments;
    }
  });

  ipcMain.on(IpcEventType.BASE.LOGOUT, (event: any, args: any) => {
    eventQueue.clean();
  });

  ipcMain.on(IpcEventType.BASE.WINDOW_MAX, (event: any, args: any) => {
    getMainWindow().maximize();
  });

  ipcMain.on(IpcEventType.BASE.WINDOW_MIN, (event: any, args: any) => {
    getMainWindow().minimize();
  });

  ipcMain.on(IpcEventType.BIZ.CREATE_VIDEO_PREVIEW, (event: any, args: any) => {
    const [path] = args;
    logger.info('---CREATE_VIDEO_PREVIEW---', path);
    doFiles(path);
  });

  ipcMain.on(IpcEventType.BIZ.FIND_CHINESE_LANGUAGE, (event: any, args: any) => {
    console.log(args, '---FIND_CHINESE_LANGUAGE---');
    const [data] = args;
    matchChinese(data.pathChinese, data.pathVideo).then((res: any) => {
      sendEventToMainWindow(IpcEventType.BIZ.FIND_CHINESE_LANGUAGE_RESULT, res);
    });
  });

  ipcMain.on(IpcEventType.BIZ.FIND_FILE, (event: any, args: any) => {
    const [data] = args;
    console.log(args, '---FIND_FILE---');
    sendEventToMainWindow(IpcEventType.BIZ.FIND_FILE_RESULT, searchPath(data.pathSource, data.keyWords, data.type));
  });

  ipcMain.on(IpcEventType.BIZ.CUT_FILES, (event: any, args: any) => {
    const [data] = args;
    logger.info('---CUT_FILES---', data);
    cutFilesToOnePath(data.sourcePath, data.targetPath);
  });

  ipcMain.on(IpcEventType.BIZ.REPLACE_CHARS, (event: any, args: any) => {
    const [data] = args;
    logger.info('---replace_chars---', data);
    replaceChars(data.sourcePath, data.oldWords, data.newWords);
  });

  ipcMain.on(IpcEventType.BIZ.FIND_REPEAT, (event: any, args: any) => {
    const [data] = args;
    logger.info('---FIND_REPEAT---', data);
    sendEventToMainWindow(IpcEventType.BIZ.FIND_FILE_RESULT, findRepeat(data.sourcePath, data.targetPath,data.ignoreChars, data.type));
  });
}

function sendEventToMainWindow(eventType: string, args: any) {
  const win = getMainWindow();
  if(win) {
    win.webContents.send(eventType, args)
  }
}
