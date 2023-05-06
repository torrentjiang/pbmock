import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { homeUrl } from '../../route/ts/conf';
import { pages, PageItem } from '../../route/page';

declare interface IProps {
  children: any;
  type?: 'list' | 'form';
}

export default (props: IProps) => {
  const [title, setTitle] = useState('首页');
  /**
   * 递归循环
   * @param items 需要循环的数组
   * @param path 需要设置path-key
   */
  const checkOption = (items: PageItem[], select: string) => {
    items.map(item => {
      if (item.children && item.children.length) {
        checkOption(item.children, select);
      } else {
        if (item.path === select) {
          setTitle(item.title);
        }
      }
    });
  };

  const initTitle = () => {
    const { hash } = window.location;
    let select = hash.substr(1) || homeUrl;
    if (select == homeUrl) {
      setTitle('首页');
    } else {
      checkOption(pages, select);
    }
  };

  useEffect(() => {
    initTitle();
  }, []);

  return (
    <div>
      <Card
        hoverable
        title={`${title}${props.type == 'list' ? '列表' : '查询'}`}
        headStyle={{ color: '#00BFB3', fontWeight: 600 }}
      >
        {props.children}
      </Card>
    </div>
  );
};
