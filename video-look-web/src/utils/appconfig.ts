/**
 * 配置文件初始化
 */
import axios from 'axios';
import { AppTypes } from '@/store/types/app-types';
// const isDev = process.env.NODE_ENV === 'development';
const configPath = './config.json';

const Config = async (store: any) => {
  const configs = await axios.get(configPath);
  await store.dispatch(AppTypes.actions.SET_CONFIGS, configs.data);
};

export default Config;
