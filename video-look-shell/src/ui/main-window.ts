import { BrowserWindow, app } from 'electron';
import path from 'path';
import url from 'url';
import config from '../lib/config';

const mainWindowConfig = config.mainWindowConfig;
const appPath = app.getAppPath();
const preloadPath = path.join(appPath, 'main/preload.js');

let window: BrowserWindow | null;
let loadUrl = ''; // 加载的url

export function createMainWindow() {
  window = new BrowserWindow({
    minWidth: 1600,
    minHeight: 900,
    frame: mainWindowConfig.frame,
    show: false,
    fullscreen: mainWindowConfig.fullScreen,
    resizable: mainWindowConfig.resizable,
    webPreferences: {
      nodeIntegration: mainWindowConfig.webPreferences.nodeIntegration,
      preload: preloadPath
    }
  });

  window.on('ready-to-show', () => {
    if (window) {
      window.show();
    }
  });

  window.on('close', event => {
    // 渲染进程通知关闭
  });

  window.on('closed', () => {
    window = null;
  });

  return window;
}

export function openMainWindow() {
  if (!window) {
    return;
  }
  if (mainWindowConfig.openDevTools) {
    window.webContents.openDevTools();
  }
  if (mainWindowConfig.isDebug) {
    loadUrl = mainWindowConfig.loadURL;
  } else {
    loadUrl = url.format({
      pathname: path.resolve(
        app.getAppPath(),
        'renderer',
        mainWindowConfig.loadPath
      )
    });
  }
  window.loadURL(loadUrl);
}

export function closeMainWindow() {
  if (window) {
    window.close();
  }
}

export function getMainWindow(): BrowserWindow {
  return window as BrowserWindow;
}