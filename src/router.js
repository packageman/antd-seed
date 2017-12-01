import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import cloneDeep from 'lodash/cloneDeep';
import getNavData from './common/nav';
import { getPlainNode } from './utils/utils';
import * as session from './utils/session';
import styles from './index.less';
import config from './config';

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

const getRouteData = (navData, path) => {
  if (!navData.some(item => item.layout === path) ||
    !(navData.filter(item => item.layout === path)[0].children)) {
    return null;
  }

  const route = cloneDeep(navData.filter(item => item.layout === path)[0]);
  const nodeList = getPlainNode(route.children);
  return nodeList;
};

const getLayout = (navData, path) => {
  if (!navData.some(item => item.layout === path) ||
    !(navData.filter(item => item.layout === path)[0].children)) {
    return null;
  }
  const route = navData.filter(item => item.layout === path)[0];
  return {
    component: route.component,
    layout: route.layout,
    name: route.name,
    path: route.path,
  };
};

export default ({ history, app }) => {
  const navData = getNavData(app);
  const UserLayout = getLayout(navData, 'UserLayout');
  const BasicLayout = getLayout(navData, 'BasicLayout');

  const passProps = {
    app,
    navData,
    getRouteData: (path) => {
      return getRouteData(navData, path);
    },
  };

  const AuthorizedRoute = (props) => {
    const currentUser = session.getCurrentUser();
    if (currentUser) {
      return <Route {...props} />;
    }

    session.destory();
    return <Redirect to={config.loginPage} />;
  };

  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
          <Route path={UserLayout.path} render={props => <UserLayout.component {...props} {...passProps} />} />
          <AuthorizedRoute
            path={BasicLayout.path}
            render={props => <BasicLayout.component {...props} {...passProps} />}
          />
        </Switch>
      </Router>
    </LocaleProvider>
  );
};
