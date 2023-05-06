import React, { useContext } from 'react';
import { Button, Divider, Popconfirm, Modal, Icon, message } from 'antd';
import { Context } from '../../index.store';
import Table from '@/components/table';
import { searchApi } from '../../index.model';
import './index.scss';
import { deleteApi } from '../../index.model';
// import { getRepositoryFileList } from '@/common/utils/getPbFile';
// import { PbTranform } from '@/lib/pbTranform';
// import PbContent from '../form/pbContent';
import { getApiHost } from '@/config';
import CopyToClipboard from 'react-copy-to-clipboard';

type Prop = {
  history: any;
};

// let pageInfo = {};

export default (props: Prop) => {
  const {
    searchData,
    setModalType,
    setModalVisible,
    setModalFormData,
    setSearchData,
    recordCount,
    setRecordCount,
    setPbContent
  } = useContext(Context);

  const edit = (row: any) => {
    setModalVisible(true);
    setModalType('edit');
    setModalFormData(row);
  };

  const deleteRow = (apiId: any) => {
    const postData = {
      apiId: apiId
    };
    deleteApi(postData).then((res: any) => {
      if (res && res.errCode === 0) {
        setSearchData({ ...searchData });
        message.success('已删除');
      } else {
        message.error(res.errMsg || '删除失败');
      }
    });
  };

  // const checkAccessToken = () => {
  //   const accessToken = localStorage.getItem('gitAccessToken');

  //   if (accessToken) {
  //     return true;
  //   } else {
  //     setModalVisible(true);
  //     setModalType('token');
  //     return false;
  //   }
  // };

  // const transPbFlieToJson = (row: any) => {
  //   getRepositoryFileList({
  //     gitUrl: row.pbLink.trim() || '',
  //     token: localStorage.getItem('gitAccessToken') || undefined
  //   }).then((res: any) => {
  //     if (res.code === 0) {
  //       const pbTranform = new PbTranform(res.data || []);

  //       const json = JSON.parse(pbTranform.parseJsonStr());
  //       setPbContent(JSON.stringify(json, null, 4));

  //       setModalVisible(true);
  //       setModalType('json');
  //       setModalFormData(row);
  //     } else {
  //       message.error(res.message);
  //     }
  //   });
  // };

  // const transPbFlieToTs = (row: any) => {
  //   getRepositoryFileList({
  //     gitUrl: row.pbLink.trim() || '',
  //     token: localStorage.getItem('gitAccessToken') || undefined
  //   }).then((res: any) => {
  //     if (res.code === 0) {
  //       const pbTranform = new PbTranform(res.data || []);

  //       setPbContent(pbTranform.parseTs());

  //       setModalVisible(true);
  //       setModalType('ts');
  //       setModalFormData(row);
  //     } else {
  //       message.error(res.message);
  //     }
  //   });
  // };

  const columns = [
    {
      title: '接口路径',
      dataIndex: 'path',
      key: 'path',
      width: 200
    },
    {
      title: '接口描述',
      dataIndex: 'desc',
      key: 'desc',
      width: 200
    },
    {
      title: '涉及网关',
      dataIndex: 'gateway',
      key: 'gateway',
      width: 200
      // render: (record: string[], row: any, index: number) => {
      //   return record.join(',');
      // }
    },
    {
      title: 'pb文件链接',
      dataIndex: 'pbLink',
      key: 'pbLink',
      width: 300
    },
    {
      title: 'mock地址',
      dataIndex: 'mockLink',
      key: 'mockLink',
      // width: 300,
      render: (record: string, row: any, index: number) => {
        return (
          <>
            <a href={`${getApiHost().apiHost}mock/${row.id}`} target="_blank" title="点击跳转">
              {`${getApiHost().apiHost}mock/${row.id}`}
            </a>
            <CopyToClipboard
              text={`${getApiHost().apiHost}mock/${row.id}`}
              onCopy={() => {
                message.success('复制成功');
              }}
              title="点击复制"
              style={{ marginLeft: 5 }}
            >
              <Icon type="copy" />
            </CopyToClipboard>
          </>
        );
      }
    },
    {
      title: '操作',
      dataIndex: '',
      key: '',
      width: 300,
      fixed: 'right',
      render: (text: string, row: any, index: number) => {
        return (
          <div style={{ textAlign: 'center' }}>
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
            <Divider type="vertical" />
            <Button
              size="small"
              onClick={() => {
                setPbContent(row.ts || '');
                setModalFormData(row);
                setModalVisible(true);
                setModalType('tsPerview');
              }}
            >
              <pre> ts </pre>
            </Button>
            <Divider type="vertical" />
            <Button
              size="small"
              onClick={() => {
                setPbContent(row.json || '');
                setModalFormData(row);
                setModalVisible(true);
                setModalType('jsonPerview');
              }}
            >
              <pre>json</pre>
            </Button>
            {/* <Divider type="vertical" />
            <Button
              size="small"
              type="primary"
              onClick={() => {
                transPbFlieToTs(row);
              }}
            >
              <p>生成 ts</p>
            </Button>
            <Divider type="vertical" />
            <Button
              size="small"
              type="primary"
              onClick={() => {
                transPbFlieToJson(row);
              }}
            >
              <p>生成 json</p>
            </Button> */}
          </div>
        );
      }
    }
  ];

  // 请求接口数据
  const searchInfo = (data: any) => {
    // console.log('data', data);
    return searchApi(data).then((res: any) => {
      const { total, list } = res.data;
      setRecordCount(total);

      return {
        total: total,
        data: list
      };
    });
  };

  return (
    <Table reqConf={searchData} queryData={searchInfo} columns={columns} scroll={{ x: 1500 }} />
  );
};
