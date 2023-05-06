import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import pages from '@/router/navs/innerNavs/index';
import Events from '@/common/utils/events';
import { getQueryVariable } from '@/common/utils/queryVariable';

const homeUrl = '/';

interface IProps {
  routes: any[];
}

interface IProject {
  name: string;
  link?: string;
  [propName: string]: any;
}

export default (props: IProps) => {
  const { routes } = props;

  const [optionKey, setOptionKey]: any[] = useState([]);
  const [emmitter, setEmmitter]: any[] = useState([]);

  Events.on('project', (msg: IProject[]) => {
    setEmmitter(msg);
  });

  /**
   * 递归循环
   * @param items 需要循环的数组
   * @param path 需要设置path-key
   */
  const checkOption = (items: any, select: string, option?: any[]) => {
    let options: IProject[] = [];
    items.map((item: any) => {
      options = option || [];
      // 有children 且是自己的
      if (item.children && item.children.length) {
        if (select.indexOf(item.path || item.parentName) > -1) {
          item.text && options.push({ name: item.text });
          checkOption(item.children, select, options);
        }
        // TODO 暂时对于“设置”进行特殊处理
        if (['/settings/group', '/settings/team'].includes(select)) {
          const settingArr = item.children.filter((p: any) => p.path === 'settings');
          if (settingArr.length > 0) {
            item.text && options.push({ name: item.text });
            checkOption(item.children, select, options);
          }
        }
      } else {
        const selectPath =
          select.indexOf('&project=') > -1 ? select.slice(0, select.indexOf('&project=')) : select;
        if (item.path === selectPath) {
          options.push({ name: item.text, link: selectPath });

          if (window.location.hash.indexOf('project=') > -1) {
            setOptionKey([...optionKey, emmitter]);
          } else {
            setOptionKey([...options]);
          }
        }
      }
    });
  };

  const init = () => {
    const { hash } = window.location;
    let select = hash.substr(1) || homeUrl;
    if (select === homeUrl) {
      setOptionKey([]);
    } else {
      const teamId = getQueryVariable('team');
      checkOption([...pages, ...routes], select);
    }
  };

  useEffect(() => {
    pages.length > 0 && init();
  }, [window.location.hash]);

  useEffect(() => {
    pages.length > 0 && init();
  }, [routes]);

  return (
    <Breadcrumb>
      {/* <Breadcrumb.Item key={homeUrl}>
        <Link to={homeUrl}>
          <Icon type="home" />
          &nbsp;首页
        </Link>
      </Breadcrumb.Item> */}
      {optionKey &&
        optionKey.map((item: IProject, index: number) => {
          return (
            <Breadcrumb.Item key={index}>
              {item.link ? <Link to={item.link}>{item.name}</Link> : item.name}
            </Breadcrumb.Item>
          );
        })}
    </Breadcrumb>
  );
};
