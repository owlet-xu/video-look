import { app } from 'electron';

import logger from './common/logger';
import { startGlobalErrorHandle } from './common/error-handler';
import { startAllListeners } from './ipc/ipc-handler';
import { createMainWindow, openMainWindow, getMainWindow } from './ui/main-window';
import { InnoSetupUpdater } from './lib/inno-setup-updater';
startGlobalErrorHandle();

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.once('ready', () => {
    logger.info('app ready');
    createMainWindow();
    openMainWindow();
    startAllListeners();
    InnoSetupUpdater();
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (getMainWindow() === null) {
    createMainWindow();
    openMainWindow();
  }
});
