import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(model => import(`../models/${model}.js`)),
  component,
});

// nav data
export default app => [
  {
    component: dynamicWrapper(app, ['adminUser'], () => import('../layouts/BasicLayout')),
    layout: 'BasicLayout',
    name: '首页', // for breadcrumb
    path: '/',
    children: [
      {
        name: '整体',
        icon: 'global',
        path: 'overall',
        component: dynamicWrapper(app, [], () => import('../routes/Overall/Index')),
      },
      {
        name: '事件',
        icon: 'area-chart',
        path: 'event',
        component: dynamicWrapper(app, [], () => import('../routes/Event/Index')),
      },
      {
        name: '漏斗',
        icon: 'filter',
        path: 'funnel',
        component: dynamicWrapper(app, [], () => import('../routes/Funnel/Index')),
      },
      {
        name: '留存',
        icon: 'appstore',
        path: 'retention',
        component: dynamicWrapper(app, [], () => import('../routes/Retention/Index')),
      },
      {
        name: '用户',
        icon: 'user',
        path: 'user',
        component: dynamicWrapper(app, [], () => import('../routes/User/Index')),
      },
    ],
  },
  {
    component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    path: '/adminUser',
    layout: 'UserLayout',
    children: [
      {
        name: '', // set empty to hide this menu in slider
        path: 'adminUser',
        children: [
          {
            name: '登录',
            path: 'login',
            component: dynamicWrapper(app, ['adminUser'], () => import('../routes/AdminUser/Login')),
          },
        ],
      },
    ],
  },
];
