import request from '@/lib/request';
import { getApiHost } from '@/config/index';
import Qs from 'qs';

const { webapiHost } = getApiHost();

/*
 * 获取页面数据
 */
export function searchApi(data: any) {
  return request({
    url: `${webapiHost}/searchApi`,
    method: 'get',
    params: data
  });
}

/**
 * 新增项目
 */
export function addApi(data: any) {
  return request({
    url: `${webapiHost}/addApi`,
    method: 'post',
    data
  });
}

/**
 * 编辑项目
 */
export function updateApi(data: any) {
  return request({
    url: `${webapiHost}/updateApi`,
    method: 'put',
    data
  });
}

/**
 * 删除项目
 */
export function deleteApi(data: any) {
  return request({
    url: `${webapiHost}/deleteApi`,
    method: 'delete',
    params: data
  });
}
