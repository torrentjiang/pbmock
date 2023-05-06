import { message } from 'antd';
import Axios from 'axios';
import { getPageHost } from '../config/index';

// Axios.defaults.withCredentials = false;

const service = Axios.create({
  timeout: 10000
});

// request interceptor request拦截器
service.interceptors.request.use(
  config => {
    // 设置请求头
    // 解决IE浏览器缓存问题
    config.headers['Cache-Control'] = 'no-cache';
    config.headers['Pragma'] = 'no-cache';
    config.headers['access_token'] = localStorage.getItem('token');
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    if (response.data.code == 403) {
      message.error('登录态过期，请重新登录');
      localStorage.setItem('token', '');
      location.href = `${getPageHost()}/login`;
      return Promise.resolve({});
    }
    if (response.data.code == 0) {
      return Promise.resolve(response.data);
    }
    return Promise.resolve(response.data);
  },
  error => {
    if (!error.response) {
      message.error('接口发生了错误');
      // 没有请求 api 的权限
      return;
    }
  }
);

export default service;
