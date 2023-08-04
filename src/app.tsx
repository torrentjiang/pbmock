import React, { useContext, useState, useEffect } from 'react';
import { render } from 'react-dom';
import { HashRouter, Switch, Route, BrowserRouter } from 'react-router-dom';
import Router from './router';
import styles from './index.less';
import { Layout, Row } from 'antd';
import Navs from './router/navs';
import Sider from './components/Layout/sider';
import Header from './components/Layout/header';
import Breadcrumb from './components/Layout/breadcrumb';
import { Context, useStore } from './app.store';
import viewRoute from '@/router/navs/innerNavs/projects';
import '@lib/axios-conf';
import './index.less';
import load from './router/ts/load';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Events from '@/common/utils/events';

moment.locale('zh-cn');

const { Content } = Layout;

const asyncImport = (name: string) => {
  return load(() => import('./app/' + name));
};

const App = () => {
  const { OutsideNavs: headerNavs, InnerNavs } = Navs;

  let store: ReturnType<typeof useStore> = useStore();
  const { dynamicRoutes, setDynamicRoutes, staticRoutes } = store;

  const [sliders, setSliders]: any = useState([]);
  const [navKey, setNavKey] = useState(''); //TODO 1

  const [refresh, setRefresh] = useState(false);

  const initNav = () => {
    if (navKey === '') {
      const sessionNavKey = sessionStorage.getItem('navKey');
      if (sessionNavKey && navKey !== sessionNavKey) {
        setNavKey(sessionNavKey);
      }
      return;
    }
    if (navKey === 'home') {
      sessionStorage.setItem('navKey', navKey);

      setSliders([]);
      return;
    }
    const childNav = dynamicRoutes.filter((item: any) => {
      return item.parentName === navKey;
    });
    if (childNav.length > 0) {
      sessionStorage.setItem('navKey', navKey);
      setSliders(childNav[0].children);
    }
  };

  Events.on('refreshMenu', msg => {
    setRefresh(msg);
  });

  // 初始化 从接口拿菜单
  useEffect(() => {
    viewRoute().then(res => {
      setDynamicRoutes([...staticRoutes, res]);
    });
  }, []);

  // 初始化 从接口拿菜单
  useEffect(() => {
    refresh &&
      viewRoute().then(res => {
        setDynamicRoutes([...staticRoutes, res]);
        setRefresh(false);
      });
  }, [refresh]);

  // head部分切换
  useEffect(() => {
    initNav();
  }, [navKey]);

  // 路由数据源变化
  useEffect(() => {
    // console.log('dynamicRoutes', dynamicRoutes);
    initNav();
  }, [dynamicRoutes]);

  return (
    <Context.Provider value={store}>
      <BrowserRouter basename='/pbmock'>
        <Switch>
          <Route path="/login" component={asyncImport('login')} />
          <div className={styles.wrap}>
            <Layout style={{ height: '100vh' }}>
              <Sider sliders={sliders}></Sider>
              <Layout>
                <Header
                  navs={headerNavs}
                  onChange={name => {
                    setNavKey(name);
                  }}
                ></Header>
                <Row style={{ padding: '10px 24px' }}>
                  <Route
                    render={() => {
                      return <Breadcrumb routes={dynamicRoutes}></Breadcrumb>;
                    }}
                  ></Route>
                </Row>
                <Content
                  className="red"
                  style={{
                    margin: '0 24px 24px',
                    padding: 24,
                    background: '#fff',
                    minHeight: 280,
                    height: '100%',
                    overflow: 'auto'
                  }}
                >
                  <Router routes={dynamicRoutes} />
                </Content>
              </Layout>
            </Layout>
          </div>
        </Switch>
      </BrowserRouter>
    </Context.Provider>
  );
};

document.title = '欢迎访问pbMock~';

render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>,
  document.getElementById('root')
);

if ((module as any).hot) {
  (module as any).hot.accept();
}
