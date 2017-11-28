import mockjs from 'mockjs';
import { getUsers } from './mock/user';
import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    $desc: "获取当前用户接口",
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dRFVcIqZOYPcSNrlJsqQ.png',
      userid: '00000001',
      notifyCount: 12,
    },
  },
  // GET POST 可省略
  'GET /api/users': getUsers,
  'POST /api/login/mobile': (req, res) => {
    res.send({ status: 'ok', type: 'mobile' });
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok' });
  }
};

export default noProxy ? {} : delay(proxy, 1000);
