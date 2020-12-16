import electron from 'electron';
import os from 'os';

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
g.network = iface;
g.computerName = computerName;
g.electron = electron;
