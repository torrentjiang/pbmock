export function getEnv(): 'dev' | 'prod' {
  const hostUrl = window.location.host;
  let env: any = 'dev';
  if (hostUrl.indexOf('localhost') > -1) {
    // dev
    env = 'dev';
  }
  if (hostUrl.indexOf('.com') > -1) {
    // sit
    env = 'prod';
  }
  return env;
}

export const env = getEnv();

// 登录页面配置
export function getApiHost() {
  let obj = {
    dev: {
      webapiHost: 'http://47.100.40.140:7009/feInnerNode', //'http://127.0.0.1:7009/feInnerNode' 'http://172.16.28.115:7009/feInnerNode'
      apiHost: 'http://10.1.20.7:7009/',
      pageHost: 'http://10.1.20.7:8080/pbMock/#'
    },
    prod: {
      webapiHost: '',
      apiHost: '',
      pageHost: ''
    }
  };
  return obj[env];
}

export function getRefererUrl() {
  return window.location.href;
}

export function getPageHost() {
  return getApiHost().pageHost;
}
