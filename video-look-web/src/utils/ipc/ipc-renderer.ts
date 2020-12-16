import { Observable, Observer } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';


declare var electron: Electron;
/**
 * 封装消息体
 *
 * @export API消息体
 * @class ApiResponse
 */
export class ApiResponse {
  result!: boolean;
  message!: string;
  overload!: boolean;
  data: any;
}


/**
 * IPC消息体
 *
 * @export 自定义IPC消息体
 * @class IpcResponse
 */
// tslint:disable-next-line:max-classes-per-file
export class IpcResponse {
  // 事件
  event: any;
  // 参数集合
  args!: any[];
}


/**
 * 模拟IpcRenderer
 *
 * @class MockIpcRenderer
 * @implements {IpcRenderer}
 */
// tslint:disable-next-line:max-classes-per-file
class MockIpcRenderer implements IpcRenderer {
  on(channel: string, listener: (event: any, ...args: any[]) => void): this {
    return this;
  }

  once(channel: string, listener: (event: any, ...args: any[]) => void): this {
    return this;
  }

  removeAllListeners(channel?: string): this {
    return this;
  }

  removeListener(channel: string, listener: any): this {
    return this;
  }

  send(channel: string, ...args: any[]): void {}

  sendSync(channel: string, ...args: any[]): void {}
}


/**
 * 自定义IpcRenderer
 *
 * @export IpcRendererService
 * @class
 */
// tslint:disable-next-line:max-classes-per-file
class IpcRendererService {
  constructor() {
    if (this.isElectron()) {
      this.ipcRenderer = electron.ipcRenderer;
    } else {
      this.ipcRenderer = new MockIpcRenderer();
    }
  }

  private ipcRenderer: IpcRenderer;

  /**
   * 监听electron事件
   *
   * @param {string} channel 事件名
   * @returns {Observable<IpcResponse>} 观察者对象
   * @memberof IpcRendererService
   */
  on(channel: string): Observable<IpcResponse> {
    return Observable.create((observer: Observer<IpcResponse>) => {
      const listener = (event: any, ...args: any[]) => {
        observer.next({event, args});
      };
      this.ipcRenderer.on(channel, listener);
      return () => {
        this.ipcRenderer.removeListener(channel, listener);
      };
    });
  }

  /**
   * 监听一次electron事件
   *
   * @param {string} channel 事件名
   * @returns {Observable<IpcResponse>} 观察者对象
   * @memberof IpcRendererService
   */
  once(channel: string): Observable<IpcResponse> {
    return Observable.create((observer: Observer<IpcResponse>) => {
      this.ipcRenderer.once(channel, (event, ...args) => {
        observer.next({event, args});
        observer.complete();
      });
    });
  }

  /**
   * 发送消息到electron
   *
   * @param {string} channel 事件名
   * @param {...any[]} args 参数列表
   * @returns {void}
   * @memberof IpcRendererService
   */
  send(channel: string, ...args: any[]): void {
    return this.ipcRenderer.send(channel, args);
  }

  /**
   * 异步发送消息到electron
   *
   * @param {string} channel 事件名
   * @param {...any[]} args 参数列表
   * @returns {void}
   * @memberof IpcRendererService
   */
  sendSync(channel: string, ...args: any[]): void {
    return this.ipcRenderer.sendSync(channel, args);
  }

  /**
   * 移除事件
   * @param channel
   */
  remove(channel: string) {
    this.ipcRenderer.removeAllListeners(channel);
  }

  /**
   * 发送消息到electron带promise返回
   *
   * @param {string} channel 事件名
   * @param {...any[]} args参数列表
   * @returns {Observable<ApiResponse>} 返回对象
   * @memberof IpcRendererService
   */
  api(channel: string, ...args: any[]): Observable<ApiResponse> {
    this.ipcRenderer.send(channel, args);
    // tslint:disable-next-line:one-variable-per-declaration
    const promise = new Promise<ApiResponse>((resolve, reject) => {
      this.ipcRenderer.once(`${channel}_reply`, (event: any, response: ApiResponse) => {
        if (response.result) {
          resolve(response);
        } else {
          reject(response);
        }
      });
    });
    return fromPromise(promise);
  }

  getElectron() {
    return electron;
  }


  /**
   * 判断当前是否为electron环境
   *
   * @private
   * @returns
   * @memberof IpcRendererService
   */
  private isElectron() {
    return window && (window as any)['process'] && ((window as any)['process'])['type'];
  }

}

/**
 * 導出單例IPC對象
 */
export const IpcRenderer = new IpcRendererService();
