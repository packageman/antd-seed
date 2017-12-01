import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link, Route, Switch, routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import GlobalFooter from '../components/GlobalFooter';
import NotFound from '../routes/Exception/404';
import styles from './UserLayout.less';
import config from '../config';
import * as session from '../utils/session';

const copyright = <div>Copyright <Icon type="copyright" />{config.copyright}</div>;

class UserLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
  }
  getChildContext() {
    const { location } = this.props;
    return { location };
  }
  getPageTitle() {
    const { getRouteData, location } = this.props;
    const { pathname } = location;
    let title = config.appName;
    getRouteData('UserLayout').forEach((item) => {
      if (item.path === pathname) {
        title = `${item.name} - ${config.appName}`;
      }
    });
    return title;
  }

  componentWillMount() {
    const currentUser = session.getCurrentUser();
    if (currentUser && currentUser.autoLogin) {
      this.props.dispatch(routerRedux.push('/overall'));
    }
  }

  render() {
    const { getRouteData } = this.props;

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img
                  alt=""
                  className={styles.logo}
                  src="https://gw.alipayobjects.com/zos/rmsportal/NGCCBOENpgTXpBWUIPnI.svg"
                />
                <span className={styles.title}>{config.appName}</span>
              </Link>
            </div>
          </div>
          <Switch>
            {
              getRouteData('UserLayout').map(item =>
                (
                  <Route
                    exact={item.exact}
                    key={item.path}
                    path={item.path}
                    component={item.component}
                  />
                ))
            }
            <Route component={NotFound} />
          </Switch>
          <GlobalFooter className={styles.footer} copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

export default connect()(UserLayout);
