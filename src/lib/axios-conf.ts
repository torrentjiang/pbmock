import { message, Modal } from 'antd';
import Axios from 'axios';
import { getAuthorizationToken, clearAll } from '../utils/tokens';

const service = Axios.create({
  // api的base_url
  // baseURL: base,
  // request timeout 请求超时时间
  timeout: 15000
});

// request interceptor request拦截器
service.interceptors.request.use(
  config => {
    // 设置请求头
    if (getAuthorizationToken()) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['token'] = getAuthorizationToken();
      // 解决IE浏览器缓存问题
      config.headers['Cache-Control'] = 'no-cache';
      config.headers['Pragma'] = 'no-cache';
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    // console.log('respone ===== :', response);
    return Promise.resolve(response.data);
  },
  error => {
    if (!error.response) {
      message.error('接口发生了错误');
      // 没有请求 api 的权限
      return;
    }

    switch (error.response.status) {
      case 400:
        error.message = '请求错误';
        break;
      case 401:
        Modal.confirm({
          title: '你已被登出，可以取消继续留在该页面，或者重新登录',
          okText: '重新登录',
          cancelText: '留在本页',
          type: 'warning',
          onOk: () => {
            clearAll();
            window.location.reload();
          }
        });
        return false;
      // break
      case 403:
        error.message = '拒绝访问';
        break;
      case 404:
        error.message = `请求地址出错: ${error.response.config.url}`;
        break;
      case 408:
        error.message = '请求超时';
        break;
      case 500:
        error.message = '服务器内部错误';
        break;
      case 501:
        error.message = '服务未实现';
        break;
      case 502:
        error.message = '网关错误';
        break;
      case 503:
        error.message = '服务不可用';
        break;
      case 504:
        error.message = '网关超时';
        break;
      case 505:
        error.message = 'HTTP版本不受支持';
        break;
      default:
    }
    message.error(error.message, 5000);
    const err = new Error(error.message);
    throw (err.message = error.message);
  }
);

export default service;
