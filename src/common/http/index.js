import * as Code from './code';
import storage from '@/common/storage/index';
import axios from 'axios';

/**
 * @param {string} api 接口地址
 * @param {string} method 上传类型
 * @param {string | object} data 数据
 * @param {boolean} withAll 是否展示所有信息
 * @param {boolean} noTips 是否无提示
 * @param {boolean} isFormData 是否是formData格式上传
 * */
function ajax ({
  api,
  method = 'get',
  data = null,
  withAll = false,
  noTips = false,
  isFormData = false
}) {
  // api地址
  let url = `${process.env.VUE_APP_BASE_API}/${api}`;
  let headers = {
    Accept: 'application/json',
    Authorization: storage.get('token') || ''
  };

  if (isFormData) {
    headers['Content-Type'] = 'multipart/form-data';
    let tempFrom = new FormData();
    Object.keys(data).forEach(key => {
      tempFrom.append(key, data[key]);
    });
    data = tempFrom;
  }

  return new Promise((resolve, reject) => {
    axios({
      headers,
      method,
      url,
      [method === 'get' ? 'params' : 'data']: data
    })
      .then(response => response.data)
      .then(async data => {
        if (data.status === Code.SUCCESS && data.flag) {
          resolve(withAll ? data : data.data);
        } else if (data.status === Code.LOGIN_EXPIRED || data.status === Code.TOKEN_EXPIRED) {
          reject(data);
        } else {
          reject(data);
        }
      })
      .catch(err => {
        let error = err.response;
        // !noTips && Toast({
        //   message: error.data ? error.data.msg : '网络请求异常',
        //   type: 'fail',
        //   duration: 3000
        // });
        reject(error.data);
      });
  });
}

export default ajax;
