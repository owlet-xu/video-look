import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

interface electron {
  ipcRenderer: IpcRenderer,
  remote: {
    getGlobal: (name: string) => any
  }
}

interface IpcRenderer {
  on(channel: string, listener: (event: any, ...args: any[]) => void): this;

  once(channel: string, listener: (event: any, ...args: any[]) => void): this;

  removeAllListeners(channel?: string): this;

  removeListener(channel: string, listener: Function): this;

  send(channel: string, ...args: any[]): void;

  sendSync(channel: string, ...args: any[]): void;
}
