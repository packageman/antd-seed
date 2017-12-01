import { routerRedux } from 'dva/router';
import login from '../services/adminUser';
import * as session from '../utils/session';
import config from '../config';

export default {
  namespace: 'adminUser',

  state: {},

  effects: {
    * login({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      const response = yield call(login, payload);
      if (response.token) {
        session.init(response);
      }
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
    },
    * logout(_, { put }) {
      session.destory();
      yield put(routerRedux.push(config.loginPage));
    },
  },

  reducers: {
    changeSubmitting(state, { payload }) {
      return {
        ...state,
        submitting: payload,
      };
    },
  },
};
