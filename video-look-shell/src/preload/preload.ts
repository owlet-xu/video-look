import electron, { webFrame } from 'electron';
import os from 'os';

import config from '../lib/config-renderer';

let g: any = window;

const ifaces = os.networkInterfaces();
const computerName = os.hostname();

let iface = null;

const ifnames = Object.keys(ifaces);
for (let i = 0; i < ifnames.length; i++) {
  iface = ifaces[ifnames[i]].find((f) => {
      return f.family === 'IPv4' && !f.internal;
  });
  if (iface) {
      break;
  }
}

if (config.dictConfig.enable) {
  webFrame.setSpellCheckProvider(config.dictConfig.lang, false, {
    spellCheck: (text) => {
      const res = electron.ipcRenderer.sendSync('spell-check', text);
      return res != null ? res : true;
    }
  });
}
g.network = iface;
g.computerName = computerName;
g.electron = electron;
