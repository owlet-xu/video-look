import { app } from 'electron';
import isDev from 'electron-is-dev';

import logger from '../common/logger';
import config from '../lib/config';
import { AutoUpdater } from './auto-updater';

export function InnoSetupUpdater() {
  const enableAutoUpdate = config.autoupdate.enable;
  if (isDev || !enableAutoUpdate) {
    return;
  }
  const feedUrl = config.autoupdate.url;
  const appName = app.getName();
  const appVersion = app.getVersion();
  const autoUpdater = new AutoUpdater();
  const fullFeedUrl = `${feedUrl}/applications/${appName}/versions/${appVersion}/check`;
  autoUpdater.setFeedURL(fullFeedUrl);
  autoUpdater.on('error', (error: any) => {
    logger.error('[AutoUpdater] Error: ' + JSON.stringify(error));
  });
  autoUpdater.on('checking-for-update', (url: string) => {
    logger.info(`[AutoUpdater] Check for updates, feed url is ${url}`);
  });
  autoUpdater.on('update-available', () => {
    console.log('update-available');
    logger.info(`[AutoUpdater] Update available`);
  });
  autoUpdater.on('update-not-available', () => {
    logger.info(`[AutoUpdater] Update not available`);
  });
  autoUpdater.on('update-downloaded', (installerPath: string) => {
    logger.info(`[AutoUpdater] Update downloaded, Installer path: ${installerPath}`);
    autoUpdater.quitAndInstall();
  });
  autoUpdater.checkForUpdates();
}
