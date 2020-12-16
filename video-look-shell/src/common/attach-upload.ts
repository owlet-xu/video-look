import request from 'request';
import fs from 'fs';

/**
 * 上传单个附件
 *
 * @param url 上传接口地址(可选)
 * @param {*} filePath 文件路径
 * @param {*} metadata 附加数据(可选), 格式：'{"system":"cad","module":"disposal","businessId":"incidentId"}'
 * @param callback 回调函数
 */
export function uploadSingle(url: string, filePath: string, metadata: any, callback: request.RequestCallback) {
  return request.post(url, {
    formData: {
      file: fs.createReadStream(filePath),
      metadata: metadata
    }
  }, callback);
}

/**
 * 上传多个附件
 *
 * @param url 上传接口地址(可选)
 * @param {*} filePaths  文件路径集合
 * @param {*} metadata 附加数据(可选), 格式：'{"system":"cad","module":"disposal","businessId":"incidentId"}'
 * @param callback 回调函数
 */
export function upload(url: string, filePaths: string[], metadata: any, callback: request.RequestCallback) {
  const files: any[] = [];
  let n = 0;
  filePaths.forEach(element => {
    files[n] = fs.createReadStream(element);
    n++;
  });

  request.post(url, {
    formData: {
      file: files,
      metadata: metadata
    }
  }, callback);
}
