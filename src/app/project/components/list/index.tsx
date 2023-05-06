import React, { useContext } from 'react';
import { Button, Divider, Popconfirm, message } from 'antd';
import { Context } from '../../index.store';
import Table from '@/components/table';
import { searchProject } from '../../index.model';
import Events from '@/common/utils/events';
import { deleteProject } from '../../index.model';
import { withRouter } from 'react-router-dom';
import './index.less';

type Prop = {
  history: any;
};

let pageInfo = {};

export default withRouter((props: Prop) => {
  const {
    searchData,
    setSearchData,
    setModalType,
    setModalVisible,
    setModalFormData,
    setRecordCount,
  } = useContext(Context);

  const detail = (projectCode: string, projectName: string) => {
    const link = `/projects/api?${window.location.hash.slice(
      '#/projects?'.length
    )}&project=${projectCode}`;
    props.history.push(link);
    Events.emit('project', { name: projectName, link: link });
  };

  const edit = (row: any) => {
    setModalVisible(true);
    setModalType('edit');
    setModalFormData(row);
  };

  const deleteRow = (projectId: any) => {
    const postData = {
      projectId: projectId,
    };
    deleteProject(postData).then((res: any) => {
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
      title: '项目名',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, row: any, index: number) => {
        return <a onClick={() => detail(row.id, row.name)}>{text}</a>;
      },
    },
    {
      title: '使用到的网关',
      dataIndex: 'module',
      key: 'module',
      // render: (text: string[], row: any, index: number) => {
      //   return text.join(',');
      // }
    },

    {
      title: '操作',
      dataIndex: '',
      key: '',
      width: 200,
      render: (text: string, row: any, index: number) => {
        return (
          <>
            <Button size="small" type="primary" onClick={() => edit(row)}>
              编辑
            </Button>
            <Divider type="vertical" />
            <Button size="small" onClick={() => detail(row.id, row.name)}>
              详情
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
      },
    },
  ];

  // 请求接口数据
  const searchInfo = (data: any) => {
    return searchProject(data).then((res: any) => {
      const { total, list } = res.data;
      setRecordCount(total);

      return {
        total: total,
        data: list,
      };
    });
  };

  return <Table reqConf={searchData} queryData={searchInfo} columns={columns} />;
});
