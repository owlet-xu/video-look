/**
 * 配置文件初始化
 */
import axios from 'axios';
// const isDev = process.env.NODE_ENV === 'development';
const configPath = '/config.json';

const Config = async (store: any) => {
  const configs = await axios.get(configPath);
  await store.dispatch('setConfigs', configs.data);
};

export default Config;
