import request from '@/lib/request';
import { getApiHost } from '@/config/index';
import Qs from 'qs';

const { webapiHost } = getApiHost();

/*
 * 获取页面数据
 */
export function searchProject(data: any) {
  return request({
    url: `${webapiHost}/searchProject`,
    method: 'get',
    params: data
  });
}

/**
 * 新增项目
 */
export function addProject(data: any) {
  return request({
    url: `${webapiHost}/addProject`,
    method: 'post',
    data
  });
}

/**
 * 编辑项目
 */
export function updateProject(data: any) {
  return request({
    url: `${webapiHost}/updateProject`,
    method: 'put',
    data
  });
}

/**
 * 删除项目
 */
export function deleteProject(data: any) {
  return request({
    url: `${webapiHost}/deleteProject`,
    method: 'delete',
    params: data
  });
}
