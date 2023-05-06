import React, { useContext, useEffect } from 'react';
import { Button, Divider, Popconfirm, message } from 'antd';
import { Context } from '../../index.store';
import Table from '@/components/table';
import { getTeam } from '../../index.model';
import './index.scss';
import { deleteTeam } from '../../index.model';

type Prop = {
  history: any;
};

let pageInfo = {};

export default (props: Prop) => {
  const {
    searchData,
    setSearchData,
    setModalType,
    setModalVisible,
    setModalFormData,
    setRecordCount
  } = useContext(Context);

  const edit = (row: any) => {
    setModalVisible(true);
    setModalType('edit');
    setModalFormData(row);
  };

  const deleteRow = (teamId: any) => {
    const postData = {
      teamId: teamId
    };
    deleteTeam(postData).then((res: any) => {
      if (res && res.errCode === 0) {
        setSearchData({ ...searchData });
        message.success('已删除');
      } else {
        message.error(res.errMsg || '删除失败');
      }
    });
  };

  const columns = [
    {
      title: '团队名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '操作',
      dataIndex: '',
      key: '',
      width: 150,
      render: (text: string, row: any, index: number) => {
        return (
          <>
            <Button size="small" type="primary" onClick={() => edit(row)}>
              编辑
            </Button>
            <Divider type="vertical" />
            <Popconfirm
              placement="top"
              title="确认删除？"
              onConfirm={() => deleteRow(row.id)}
              okText="确认"
              cancelText="取消"
            >
              <Button size="small" type="danger">
                删除
              </Button>
            </Popconfirm>
          </>
        );
      }
    }
  ];

  // 请求接口数据
  const searchInfo = (data: any) => {
    return getTeam(data).then((res: any) => {
      const { total, list } = res.data;
      setRecordCount(total);

      return {
        total: total,
        data: list
      };
    });
  };

  return <Table reqConf={searchData} queryData={searchInfo} columns={columns} />;
};
