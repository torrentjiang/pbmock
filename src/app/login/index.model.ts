import request from '@/lib/axios-conf';
import { getApiHost } from '@/config/index';

const { webapiHost } = getApiHost();

/*
 * 登录
 */
export function login(data: any) {
  return new Promise(resolve => {
    resolve({
      data: {
        token: 123
      },
      errCode: 0
    });
  });
}
