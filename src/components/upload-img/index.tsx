import React, { useState, useEffect } from 'react';
import { Upload, Icon, message } from 'antd';
import request from '@lib/request';
import { getApiHost } from '@/config/index';
const { webapiHost } = getApiHost();
import styles from './index.scss?l';

const uploadAttach = function(params: any) {
  const { file, data } = params;
  var content_len = Math.round((file.size * 100) / 1024) / 100;
  var fd = new FormData();
  // fd.append('x:key', '1');
  // fd.append('x:key_type', '0');
  fd.append('Content-Length', String(content_len));
  fd.append('OSSAccessKeyId', data.OSSAccessKeyId);
  fd.append('policy', data.policy);
  fd.append('signature', data.signature);
  //文件名字
  fd.append('key', data.path + data.name);
  fd.append('dir', data.path);
  fd.append('callback', data.callback);
  fd.append('success_action_status', '200');
  //文件必须声明在最后，否则异常
  fd.append('file', file);

  return new Promise((resolve, reject) => {
    request({
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: function(data) {
        return data;
      },
      url: data.imgServer,
      data: fd
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const uploader = function(file: any, fileType: any) {
  // return
  return new Promise((resolve, reject) => {
    //其中入参：fileUsage（取值：0-shop，1-user，2-excel）
    message.loading('上传中，请稍候...', 30);

    request({
      method: 'get',
      url: `${webapiHost}/api/upload/oss/cert?fileUsage=${fileType || 0}`
      // params: {
      //   key: 1,
      //   key_type: 0
      // }
    })
      .then((res: any) => {
        message.destroy();
        if (res.errCode != 0) {
          return;
        }
        let data: any = {};
        const { accessKey, callback, dir, expire, filename, host, policy, signature } = res.data;

        data.imgServer = host;
        data.OSSAccessKeyId = accessKey;
        data.policy = policy;
        data.signature = signature;
        data.path = dir;
        data.name = filename;
        data.file = file;
        data.callback = callback;
        data.expire = expire;
        uploadAttach({ data, file }).then((res: any) => {
          resolve({ res: res, url: res.data });
        });
      })
      .catch(err => {
        message.destroy();
      });
  });
};

export default (props: any) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const { uploadType, callBack } = props;

  const choosePic = (e: any) => {
    var file = e.target.files[0];
    var res = uploader(file, uploadType);
    if (uploadType == 2) {
      e.target.value = '';
    }
    res.then(function(result: any) {
      const { code, msg } = result.res;

      if (code == 0) {
        if (uploadType == 2) {
          message.info('导入成功');
          callBack && callBack();
          return;
        }
      } else {
        message.error(msg || '上传失败');
        // callBack && callBack();
        return;
      }
      setImageUrl(result.url);
      props.onChange && props.onChange(result.url);
    });
  };

  useEffect(() => {
    const { imgPath } = props;
    if (imgPath) {
      setImageUrl(imgPath);
      props.onChange && props.onChange(imgPath);
    }
  }, []);

  return (
    <>
      {uploadType == 2 ? (
        <input
          type="file"
          onChange={choosePic}
          name=""
          className={styles.file}
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        />
      ) : (
        <input type="file" onChange={choosePic} name="" className={styles.file} />
      )}

      {imageUrl && <img src={imageUrl} className={styles.img} />}
    </>
  );
};
