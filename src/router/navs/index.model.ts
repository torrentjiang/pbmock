import request from '@/lib/request';
import { getApiHost } from '@/config/index';
import Qs from 'qs';

const { webapiHost } = getApiHost();

/*
 * 获取页面数据
 */
export function getDynamicMenu() {
  return request({
    url: `${webapiHost}/getTeamGroupList`,
    method: 'get',
    params: {
      current: 1,
      size: 9999
    }
  });
}
