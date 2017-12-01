import 'babel-polyfill';
import dva from 'dva';
import 'moment/locale/zh-cn';
import { createLogger } from 'redux-logger';
import browserHistory from 'history/createBrowserHistory';
import './g2';
import './index.less';
import router from './router';

// 1. Initialize
const app = dva({
  history: browserHistory(),
});

// 2. Plugins
app.use({ onAction: createLogger() });

// 3. Register global model
app.model(require('./models/global'));

// 4. Router
app.router(router);

// 5. Start
app.start('#root');
