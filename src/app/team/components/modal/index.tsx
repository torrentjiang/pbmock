import React, { useContext } from 'react';
import { message } from 'antd';
import { Context } from '../../index.store';
import FormModal from '@components/form-modal';
import PageForm from '../form';
import { addTeam, updateTeam } from '../../index.model';

export default () => {
  const {
    modalType,
    modalVisible,
    setModalVisible,
    setSearchData,
    searchData,
    modalFormData
  } = useContext(Context);

  const reRenderList = () => {
    setSearchData({ ...searchData });
  };

  const submit = (data: any) => {
    if (modalType === 'add') {
      addTeam(data).then((res: any) => {
        if (res.errCode !== 0) {
          message.error(res.errMsg || '新增团队失败');
          return;
        }
        reRenderList();
        message.success('新增团队成功，请在群组管理中继续设置', 5);
        setModalVisible(false);
      });
    }

    if (modalType === 'edit') {
      const updateData = {
        teamId: modalFormData.id,
        teamName: data.teamName
      };
      updateTeam(updateData).then((res: any) => {
        if (res.errCode !== 0) {
          message.error(res.errMsg || '编辑团队失败');
          return;
        }
        reRenderList();
        message.success('编辑团队成功，请在群组管理中继续设置', 5);
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
        title={modalType === 'edit' ? '编辑团队' : '新增团队'}
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
