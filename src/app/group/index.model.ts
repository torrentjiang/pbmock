import request from '@/lib/request';
import { getApiHost } from '@/config/index';
import Qs from 'qs';

const { webapiHost } = getApiHost();

/*
 * 获取页面数据
 */
export function getTeamGroupList(data: any) {
  return request({
    url: `${webapiHost}/getTeamGroupList`,
    method: 'get',
    params: data
  });
}

/**
 * 新增群组
 */
export function addGroup(data: any) {
  return request({
    url: `${webapiHost}/addGroup`,
    method: 'post',
    data
  });
}

/**
 * 编辑群组
 */
export function updateGroup(data: any) {
  return request({
    url: `${webapiHost}/updateGroup`,
    method: 'put',
    data
  });
}

/**
 * 删除群组
 */
export function deleteGroup(data: any) {
  return request({
    url: `${webapiHost}/deleteGroup`,
    method: 'delete',
    params: data
  });
}

/**
 * 获取团队列表
 */
export function getTeam() {
  return request({
    url: `${webapiHost}/getTeam`,
    method: 'get'
  });
}
