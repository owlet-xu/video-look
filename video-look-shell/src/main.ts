import { app } from 'electron';

import logger from './common/logger';
import { startGlobalErrorHandle } from './common/error-handler';
import { startAllListeners } from './ipc/ipc-handler';
import { createMainWindow, openMainWindow, getMainWindow } from './ui/main-window';
startGlobalErrorHandle();

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.once('ready', () => {
    logger.info('app ready');
    createMainWindow();
    openMainWindow();
    startAllListeners();
  });
}

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (getMainWindow() === null) {
    createMainWindow();
    openMainWindow();
  }
});
