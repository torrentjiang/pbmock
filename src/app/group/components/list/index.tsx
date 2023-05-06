import React, { useContext } from 'react';
import { Button, Divider, Popconfirm, message } from 'antd';
import { Context } from '../../index.store';
import Table from '@/components/table';
import { getTeamGroupList } from '../../index.model';
import './index.less';
import { deleteGroup } from '../../index.model';
import Events from '@/common/utils/events';

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

  const deleteRow = (groupId: any) => {
    const postData = {
      groupId: groupId
    };
    deleteGroup(postData).then((res: any) => {
      if (res && res.errCode === 0) {
        setSearchData({ ...searchData });
        message.success('已删除');

        Events.emit('refreshMenu', true);
      } else {
        message.error(res.errMsg || '删除失败');
      }
    });
  };

  const columns = [
    {
      title: '团队名',
      dataIndex: 'teamName',
      key: 'teamName'
    },
    {
      title: '群组名',
      dataIndex: 'groupName',
      key: 'groupName'
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
              onConfirm={() => deleteRow(row.groupId)}
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
    return getTeamGroupList(data).then((res: any) => {
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
