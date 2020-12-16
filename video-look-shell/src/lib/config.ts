import { app, remote } from 'electron';
import fs from 'fs';
import path from 'path';

const mainProcessApp = app || remote.app;

const appPath = mainProcessApp.getAppPath();
const configPath = path.resolve(appPath, 'config.json');
const rawData = fs.readFileSync(configPath);
const config = JSON.parse(rawData.toString());

export default config;
