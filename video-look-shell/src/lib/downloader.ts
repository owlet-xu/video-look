import request from 'request';
import fs from 'fs';
import path from 'path';
import { EventEmitter } from 'events';

type EventName =
  | 'error'
  | 'download-start'
  | 'download-end'
  | 'progress'
  | 'saved';

export class Downloader {
  private url: string = '';
  private filePath: string = '';
  private loader = new EventEmitter();

  public setDownloadUrl(url: string) {
    this.url = url;
  }

  public getDownloadUrl(): string {
    return this.url;
  }

  public setFilePath(filePath: string) {
    this.filePath = filePath;
  }

  public getFilePath(): string {
    return this.filePath;
  }

  public on(event: EventName, callback: (args: any) => void) {
    this.loader.on(event, args => {
      callback(args);
    });
  }

  public download(): void {
    const pathObj = path.parse(this.filePath);
    if (!fs.existsSync(pathObj.dir)) {
      fs.mkdirSync(pathObj.dir);
    }
    const writeStream = fs.createWriteStream(this.filePath, {
      encoding: 'binary'
    });
    this.loader.emit('download-start');
    request
      .get(this.url)
      .on('response', resp => {
        this.loader.emit('download-end');
        resp.pipe(writeStream);
      })
      .on('error', error => {
        this.loader.emit('error', error);
      });
    writeStream.on('close', () => {
      this.loader.emit('saved', this.filePath);
    });
  }
}
