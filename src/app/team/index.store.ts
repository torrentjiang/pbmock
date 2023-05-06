import React, { useState } from 'react';

export const useStore = () => {
  const queryData = {
    current: 1,
    size: 10
  };
  // 搜索数据
  const [searchData, setSearchData]: any = useState(queryData);
  const [modalType, setModalType] = useState('add');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFormData, setModalFormData] = useState({});
  const [recordCount, setRecordCount] = useState(0);

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
    setRecordCount
  };
};

export const Context: React.Context<any> = React.createContext(null);
