import request from '@/lib/request';
import { getApiHost } from '@/config/index';
import Qs from 'qs';

const { webapiHost } = getApiHost();

/*
 * 获取页面数据
 */
export function getTeam(data: any) {
  return request({
    url: `${webapiHost}/getTeam`,
    method: 'get',
    params: data
  });
}

/**
 * 新增群组
 */
export function addTeam(data: any) {
  return request({
    url: `${webapiHost}/addTeam`,
    method: 'post',
    data
  });
}

/**
 * 编辑群组
 */
export function updateTeam(data: any) {
  return request({
    url: `${webapiHost}/updateTeam`,
    method: 'put',
    data
  });
}

/**
 * 删除群组
 */
export function deleteTeam(data: any) {
  return request({
    url: `${webapiHost}/deleteTeam`,
    method: 'delete',
    params: data
  });
}
