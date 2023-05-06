import React, { useEffect } from 'react';
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import load from './ts/load';
import {INavs} from './navs';
import styles from './index.less';
import { RouteComponentProps } from 'react-router';
import { isLogin } from '@/lib/auth';
import viewRoute from '@/router/navs/innerNavs/projects';

const NoMatch = () => {
  return <div>404</div>;
};

const asyncImport = (name: string) => {
  return load(() => import('../app/' + name));
};

let childNavs: INavs[] = [];
const getChildNavs = (data: any[]): any => {
  data &&
    data.map(item => {
      if (item.children && item.children.length > 0) {
        getChildNavs(item.children);
      } else {
        childNavs.push(item);
      }
    });
};

export default withRouter((props: any) => {
  const { routes } = props;

  useEffect(() => {
    getChildNavs(routes);
  }, [routes]);

  return (
    <Switch>
      {
        childNavs?.length > 0 &&
        childNavs.map(item => {
          let path = item.path.split('?')[0];
          return <Route key={item.id} path={path} component={asyncImport(item.component)}></Route>;
        })}
      <Route path="/home" exact component={asyncImport('home')} />
      <Route path="/" exact component={asyncImport('home')} />
      <Route component={NoMatch} />
    </Switch>
  );
});
