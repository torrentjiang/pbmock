import React, { useState } from 'react';
import { getQueryVariable } from '@/common/utils/queryVariable';

export const useStore = () => {
  const queryData = {
    current: 1,
    size: 10,
    projectId: getQueryVariable('project')
  };
  // 搜索数据
  const [searchData, setSearchData]: any = useState(queryData);
  const [modalType, setModalType] = useState('add');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFormData, setModalFormData] = useState({});
  const [recordCount, setRecordCount] = useState(0);
  // pb转换后的字符串
  const [pbContent, setPbContent] = useState('');
  // 接口类型 0：通过pbLink解析 1：手动填写
  const [tabKey, setTabKey] = useState('0');

  return {
    searchData,
    setSearchData,
    modalType,
    setModalType,
    modalVisible,
    setModalVisible,
    modalFormData,
    setModalFormData,
    recordCount,
    setRecordCount,
    pbContent,
    setPbContent,
    tabKey,
    setTabKey
  };
};

export const Context: React.Context<any> = React.createContext(null);
