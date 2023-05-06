import React, { useContext } from 'react';
import { message } from 'antd';
import { Context } from '../../index.store';
import FormModal from '@components/form-modal';
import PageForm from '../form';
import { addProject, updateProject } from '../../index.model';
import { getQueryVariable } from '@/common/utils/queryVariable';

export default () => {
  const { modalType, modalVisible, setModalVisible, setSearchData, searchData, modalFormData } = useContext(Context);

  const reRenderList = () => {
    setSearchData({ ...searchData });
  };

  const submit = (data: any) => {
    if (modalType === 'add') {
      const queryData = {
        groupId: getQueryVariable('group'),
        teamId: getQueryVariable('team'),
        projectName: data.projectName
      };
      addProject(queryData).then((res: any) => {
        if (res.errCode !== 0) {
          message.error(res.errMsg || '新增项目失败');
          return;
        }
        reRenderList();
        message.success('新增项目成功');
        setModalVisible(false);
      });
    }

    if (modalType === 'edit') {
      const editData = {
        projectId: modalFormData.id,
        projectName: data.projectName
      };
      updateProject(editData).then((res: any) => {
        if (res.errCode !== 0) {
          message.error(res.errMsg || '编辑项目失败');
          return;
        }
        reRenderList();
        message.success('编辑项目成功');
        setModalVisible(false);
      });
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    modalVisible && (
      <FormModal
        title={modalType === 'edit' ? '编辑项目' : '新增项目'}
        visible={modalVisible}
        onCancel={closeModal}
        submit={submit}
        modalType={modalType}
      >
        {PageForm}
      </FormModal>
    )
  );
};
