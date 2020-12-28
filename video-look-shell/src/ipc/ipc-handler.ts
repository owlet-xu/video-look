import { ipcMain, BrowserWindow } from 'electron';

// import logger from '../common/logger';
import { eventQueue } from './event-queue';
import { IpcEventType } from './ipc-event-type';
import {
  closeMainWindow,
  getMainWindow,
  getIncidentWindow
} from '../ui/main-window';
import { doFiles } from '../common/video-preview';
import { matchChinese, showItemInFolder } from '../common/match-chinese';

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

  ipcMain.on(IpcEventType.SWITCH.CHANGE_LANGUAGE, (event: any, args: any) => {
    if (args) {
      const [command] = args;
      const win: BrowserWindow = getIncidentWindow();
      win.webContents.send(IpcEventType.SWITCH.CHANGE_LANGUAGE, command);
    }
  });

  ipcMain.on(IpcEventType.BIZ.CREATE_VIDEO_PREVIEW, (event: any, args: any) => {
    const [path] = args;
    console.log(path, '---CREATE_VIDEO_PREVIEW---');
    doFiles(path);
  });

  ipcMain.on(IpcEventType.BIZ.FIND_CHINESE_LANGUAGE, (event: any, args: any) => {
    console.log(args, '---FIND_CHINESE_LANGUAGE---');
    const [data] = args;
    console.log(11111111);
    matchChinese(data.pathChinese, data.pathVideo).then((res: any) => {
      console.log(3333333333);
      sendEventToMainWindow(IpcEventType.BIZ.SEND_CHINESE_LANGUAGE, res);
    });
    console.log(22222222222);
  });
}

function sendEventToMainWindow(eventType: string, args: any) {
  const win = getMainWindow();
  win && win.webContents.send(eventType, args);
}
