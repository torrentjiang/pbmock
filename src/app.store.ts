import React, { useState } from 'react';
import Navs, { INavs } from './router/navs';

export const useStore = () => {
  const { OutsideNavs: headerNavs, InnerNavs } = Navs;

  const [selectKey, setSelectKey] = useState('1');
  // 路由对象
  const [dynamicRoutes, setDynamicRoutes]: any = useState<INavs>([]);
  // 固定对象
  const [staticRoutes, setStaticRoutes] = useState(InnerNavs);

  return {
    selectKey,
    setSelectKey,
    // 路由对象
    dynamicRoutes,
    setDynamicRoutes,
    // 固定对象
    staticRoutes,
    setStaticRoutes
  };
};

export const Context: React.Context<any> = React.createContext(null);
