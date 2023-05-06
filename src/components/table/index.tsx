import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import uuid from 'uuid';
import styles from './index.scss?l';

declare interface queryData {
  current: number;
  size: number;
  [x: string]: any;
}

declare interface resData {
  total: number;
  data: any[];
}

declare interface Props<T> extends TableProps<T> {
  reqConf: { [x: string]: any }; // 请求参数
  queryData: (data: queryData) => Promise<resData>; // 接口
  setData?: any[];
  noPanel?: boolean; // 不加载panel
}

export default (props: Props<any>) => {
  // 解析props参数
  const { reqConf, queryData, noPanel = false, setData } = props;
  // 加载数据loading
  const [loading, setLoading] = useState(false);
  // 页面size
  const [pageSize, setPageSize] = useState(10);
  // 页面number
  const [pageNumber, setPageNumber] = useState(1);
  // size列表
  const [pageSizeOptions, setPageSizeOptions]: any = useState([]);
  // 数据总数
  const [total, setTotal] = useState(0);
  // 列表数据
  const [tableData, setTableData]: any = useState([]);
  // 初始化
  const init = (pageNumber?: number, pageSize?: number) => {
    const _page = pageNumber || reqConf.current || 1;
    setLoading(true);
    let req = {
      ...reqConf,
      current: _page, // _page - 1,
      size: pageSize || reqConf.size || 10
    };
    // setPageNumber(req.current + 1);
    setPageNumber(req.current);
    setPageSize(req.size);
    setPageSizeOptions(setPageOptions(req.size));
    // 如果存在 获取方法
    queryData(req)
      .then(res => {
        setTotal(res.total || 0);
        set(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const setPageOptions = (size?: number): string[] => {
    let options: string[] = ['10', '25', '50', '100'];
    if (size) {
      options.push(String(size));
      options = Array.from(new Set(options));
      options.sort((value1, value2) => {
        return Number(value1) - Number(value2);
      });
    }
    return options;
  };

  const set = (res: any[]) => {
    let data: any[] = res || [];
    data &&
      data.forEach(item => {
        item._key_id = uuid.v1();
      });
    setLoading(false);
    setTableData(data);
  };

  useEffect(() => {
    // const {page, size} = reqConf || {page: 1, size: 10};
    init();
  }, [reqConf]);

  useEffect(() => {
    setData && set(setData);
  }, [setData]);

  const TableArea = () => (
    <Table
      rowKey="_key_id"
      bordered
      loading={loading}
      size="middle"
      dataSource={tableData}
      className={styles.mtb}
      pagination={{
        size: 'default',
        total: total,
        pageSize: pageSize,
        current: pageNumber,
        pageSizeOptions: pageSizeOptions,
        showSizeChanger: true,
        showTotal(total, range) {
          return (
            <>
              共{total}条；&nbsp;当前为：{range[0]}~{range[1]}条
            </>
          );
        },
        onChange(pageNumber, pageSize) {
          init(pageNumber, pageSize);
        },
        onShowSizeChange(pageNumber, pageSize) {
          init(pageNumber, pageSize);
        }
      }}
      {...props}
    />
  );

  return <TableArea />;
};
