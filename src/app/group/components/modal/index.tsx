import React, { useContext } from 'react';
import { message } from 'antd';
import { Context } from '../../index.store';
import FormModal from '@components/form-modal';
import PageForm from '../form';
import { addGroup, updateGroup } from '../../index.model';
import Events from '@/common/utils/events';

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
      addGroup(data).then((res: any) => {
        if (res.errCode !== 0) {
          message.error(res.errMsg || '新增群组失败');
          return;
        }
        reRenderList();
        message.success('新增群组成功');
        setModalVisible(false);

        Events.emit('refreshMenu', true);
      });
    }

    if (modalType === 'edit') {
      const editData = {
        // teamId: modalFormData.teamId,
        groupId: modalFormData.groupId,
        groupName: data.groupName
      };
      updateGroup(editData).then((res: any) => {
        if (res.errCode !== 0) {
          message.error(res.errMsg || '编辑群组失败');
          return;
        }
        reRenderList();
        message.success('编辑群组成功');
        setModalVisible(false);

        Events.emit('refreshMenu', true);
      });
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    modalVisible && (
      <FormModal
        title={modalType === 'edit' ? '编辑群组' : '新增群组'}
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
