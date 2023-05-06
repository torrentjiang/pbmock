import React, { useContext } from 'react';
import { message } from 'antd';
import { Context } from '../../index.store';
import FormModal from '@components/form-modal';
import PageForm from '../form';
import PbContent from '../form/pbContent';
import AccessToken from '../form/accessToken';
import { addApi, updateApi } from '../../index.model';
import { getQueryVariable } from '@/common/utils/queryVariable';
import { PbTranform } from '@/lib/pbTranform';
import { getRepositoryFileList } from '@/common/utils/getPbFile';

export default () => {
  const {
    modalFormData,
    modalType,
    modalVisible,
    setModalVisible,
    setSearchData,
    searchData,
    setModalType,
    tabKey
  } = useContext(Context);

  const reRenderList = () => {
    setSearchData({ ...searchData });
  };

  const submit = (data: any) => {
    if (modalType === 'add') {
      let jsonStr = '';
      let tsStr = '';

      // 接口类型 0：通过pbLink解析 1：手动填写
      if (tabKey === '1') {
        const postData = {
          projectId: getQueryVariable('project'),
          ts: tsStr,
          json: jsonStr,
          ...data,
          gatewayName: '',
          pbLink: '',
          apiName: '',
          noLink: 1
        };

        addApi(postData).then((res: any) => {
          if (res.errCode !== 0) {
            message.error(res.errMsg || '新增接口失败');
            return;
          }
          reRenderList();
          message.success('新增接口成功');
          setModalVisible(false);
        });
      } else {
        const p1 = new Promise((resolve, reject) => {
          getRepositoryFileList({
            gitUrl: data.pbLink.trim() || '',
            token: localStorage.getItem('gitAccessToken') || undefined
          })
            .then((res: any) => {
              if (res.code === 0) {
                const pbTranform = new PbTranform(res.data || []);

                // 如果指定了接口
                if (data.apiName) {
                  const json = pbTranform.parseJson()[data.apiName];
                  jsonStr = JSON.stringify(json, null, 4);
                } else {
                  const json = JSON.parse(pbTranform.parseJsonStr());
                  jsonStr = JSON.stringify(json, null, 4);
                }
              } else {
                reject(res.message);
              }
            })
            .finally(() => resolve());
        });

        const p2 = new Promise((resolve, reject) => {
          getRepositoryFileList({
            gitUrl: data.pbLink.trim() || '',
            token: localStorage.getItem('gitAccessToken') || undefined
          })
            .then((res: any) => {
              if (res.code === 0) {
                const pbTranform = new PbTranform(res.data || []);
                tsStr = pbTranform.parseTsStr();
              } else {
                reject(res.message);
              }
            })
            .finally(() => resolve());
        });

        Promise.all([p1, p2])
          .then(result => {
            const postData = {
              projectId: getQueryVariable('project'),
              ...data,
              ts: tsStr,
              json: jsonStr,
              noLink: 0
            };

            addApi(postData).then((res: any) => {
              if (res.errCode !== 0) {
                message.error(res.errMsg || '新增接口失败');
                return;
              }
              reRenderList();
              message.success('新增接口成功');
              setModalVisible(false);
            });
          })
          .catch(e => message.error(e));
      }
    }

    if (modalType === 'edit') {
      if (tabKey === '1') {
        const postData = {
          id: modalFormData.id,
          projectId: getQueryVariable('project'),
          ...data,
          ts: modalFormData.ts,
          gatewayName: '',
          pbLink: '',
          apiName: '',
          noLink: 1
        };

        updateApi(postData).then((res: any) => {
          if (res.errCode !== 0) {
            message.error(res.errMsg || '编辑接口失败');
            return;
          }
          reRenderList();
          message.success('编辑接口成功');
          setModalVisible(false);
        });
      } else {
        let jsonStr = '';
        let tsStr = '';

        const p1 = new Promise((resolve, reject) => {
          getRepositoryFileList({
            gitUrl: data.pbLink.trim() || '',
            token: localStorage.getItem('gitAccessToken') || undefined
          })
            .then((res: any) => {
              if (res.code === 0) {
                const pbTranform = new PbTranform(res.data || []);

                // 如果指定了接口
                if (data.apiName) {
                  const json = pbTranform.parseJson()[data.apiName];
                  jsonStr = JSON.stringify(json, null, 4);
                } else {
                  const json = JSON.parse(pbTranform.parseJsonStr());
                  jsonStr = JSON.stringify(json, null, 4);
                }
              } else {
                reject(res.message);
              }
            })
            .finally(() => resolve());
        });

        const p2 = new Promise((resolve, reject) => {
          getRepositoryFileList({
            gitUrl: data.pbLink.trim() || '',
            token: localStorage.getItem('gitAccessToken') || undefined
          })
            .then((res: any) => {
              if (res.code === 0) {
                const pbTranform = new PbTranform(res.data || []);

                // 如果指定了接口
                if (data.apiName) {
                  tsStr = pbTranform.parseTs()[data.apiName];
                } else {
                  tsStr = pbTranform.parseTsStr();
                }
              } else {
                reject(res.message);
              }
            })
            .finally(() => resolve());
        });

        Promise.all([p1, p2])
          .then(result => {
            const postData = {
              id: modalFormData.id,
              projectId: getQueryVariable('project'),
              ...data,
              ts: tsStr || '',
              json: jsonStr || '',
              noLink: 0
            };

            updateApi(postData).then((res: any) => {
              if (res.errCode !== 0) {
                message.error(res.errMsg || '编辑接口失败');
                return;
              }
              reRenderList();
              message.success('编辑接口成功');
              setModalVisible(false);
            });
          })
          .catch(e => message.error(e));
      }
    }

    if (modalType === 'json') {
      const postData = {
        ...modalFormData,
        json: data.text
      };

      updateApi(postData).then((res: any) => {
        if (res.errCode !== 0) {
          message.error(res.errMsg || '编辑接口失败');
          return;
        }
        reRenderList();
        message.success('编辑接口成功');
        setModalVisible(false);
      });
    }

    if (modalType === 'ts') {
      const postData = {
        ...modalFormData,
        ts: data.text
      };
      updateApi(postData).then((res: any) => {
        if (res.errCode !== 0) {
          message.error(res.errMsg || '编辑接口失败');
          return;
        }
        reRenderList();
        message.success('编辑接口成功');
        setModalVisible(false);
      });
    }

    if (modalType === 'jsonPerview') {
      const postData = {
        ...modalFormData,
        json: data.text
      };
      updateApi(postData).then((res: any) => {
        if (res.errCode !== 0) {
          message.error(res.errMsg || '编辑接口失败');
          return;
        }
        reRenderList();
        message.success('编辑接口成功');
        setModalVisible(false);
      });
    }

    if (modalType === 'tsPerview') {
      const postData = {
        ...modalFormData,
        ts: data.text
      };
      updateApi(postData).then((res: any) => {
        if (res.errCode !== 0) {
          message.error(res.errMsg || '编辑接口失败');
          return;
        }
        reRenderList();
        message.success('编辑接口成功');
        setModalVisible(false);
      });
    }

    if (modalType === 'token') {
      localStorage.setItem('gitAccessToken', data.accessToken);
      message.success('令牌更新成功');
      setModalVisible(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const getTitle = (type: string) => {
    switch (type) {
      case 'edit':
        return '编辑接口';
      case 'add':
        return '新增接口';
      case 'json':
        return 'JSON';
      case 'ts':
        return 'TS';
      case 'token':
        return '令牌设置';
      case 'jsonPerview':
        return '查看 JSON';
      case 'tsPerview':
        return '查看 TS';
      default:
    }
  };

  return (
    modalVisible && (
      <FormModal
        title={getTitle(modalType)}
        visible={modalVisible}
        onCancel={closeModal}
        submit={submit}
        modalType={modalType}
      >
        {modalType === 'edit' || modalType === 'add'
          ? PageForm
          : modalType === 'json' ||
            modalType === 'ts' ||
            modalType === 'jsonPerview' ||
            modalType === 'tsPerview'
          ? PbContent
          : AccessToken}
      </FormModal>
    )
  );
};
