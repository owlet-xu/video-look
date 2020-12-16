import { dialog, app } from 'electron';
import { EventEmitter } from 'events';
import { spawn } from 'child_process';
import url from 'url';
import path from 'path';
import request from 'request';

import { Downloader } from './downloader';

type EventName =
  | 'error'
  | 'checking-for-update'
  | 'update-available'
  | 'update-not-available'
  | 'update-downloaded'
  | 'before-quit-for-update';

interface CheckResult {
  appName: string;
  description: string;
  downloadUrl: string;
  needUpdate: boolean;
  updateTime: string;
  version: string;
}

export class AutoUpdater {
  private feedURL = '';
  private result: CheckResult | null = null;
  private installerPath = '';
  private updater = new EventEmitter();

  public setFeedURL(feedURL: string) {
    this.feedURL = feedURL;
  }

  public getFeedURL() {
    return this.feedURL;
  }

  public checkForUpdates() {
    if (!this.feedURL) {
      const event: EventName = 'error';
      this.updater.emit(event, 'need to call before setFeedURL');
    }
    this.updater.emit('checking-for-update', this.feedURL);

    request.get(this.feedURL, {}, (error, response, body: string) => {
      if (error) {
        this.updater.emit('error', error);
      }
      const result: CheckResult = JSON.parse(body);
      this.result = result;
      if (result && result.needUpdate) {
        this.updater.emit('update-available');
        this.download(result.downloadUrl);
      } else {
        this.updater.emit('update-not-available');
      }
    });
  }

  public quitAndInstall() {
    if (!this.result || !this.result.needUpdate) {
      this.updater.emit('error', 'need to call before checkForUpdates');
      return;
    }
    if (!this.installerPath) {
      this.updater.emit('error', 'need to call in "update-downloaded" event');
    }
    const title = this.result.appName;
    const message = `Have available updates.
    version: ${this.result.version}
    time: ${this.result.updateTime}
    ${this.result.description}
    `;
    const installerPath = this.installerPath;
    dialog.showMessageBox(
      { buttons: ['yes', 'no'], message, title, type: 'question' },
      (response, r) => {
        if (response === 0) {
          spawn(installerPath, ['/SILENT'], {
            detached: true,
            stdio: ['ignore', 'ignore', 'ignore']
          });
          this.updater.emit('before-quit-for-update');
          app.quit();
        }
      }
    );
  }

  public on(event: EventName, callback: (args: any) => void) {
    this.updater.on(event, (args) => {
      callback(args);
    });
  }

  private download(installerUrl: string) {
    const urlObj = url.parse(this.feedURL);
    const pathObj = path.parse(installerUrl);
    const downloadUrl = `${urlObj.protocol}//${urlObj.host}/${installerUrl}`;
    const fileName = pathObj.base;
    const filePath = path.resolve(app.getPath('temp'), 'Installer', fileName);
    const downloader = new Downloader();
    downloader.setDownloadUrl(downloadUrl);
    downloader.setFilePath(filePath);
    downloader.download();
    downloader.on('saved', (installerPath: string) => {
      this.installerPath = installerPath;
      this.updater.emit('update-downloaded', installerPath);
    });
  }
}
