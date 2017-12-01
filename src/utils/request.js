import fetch from 'dva/fetch';
import { notification } from 'antd';

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async (url, options) => {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };
    newOptions.body = JSON.stringify(newOptions.body);
  }

  const response = await fetch(url, newOptions);
  try {
    checkStatus(response);
    return response.json();
  } catch (error) {
    notifyError(error);
    return error;
  }
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error();
  error.response = response;
  throw error;
};

const notifyError = async (error) => {
  if (error.code) {
    notification.error({
      message: error.name,
      description: error.message,
    });
  }
  if ('response' in error) {
    const body = await error.response.json();
    let level = 'warning';
    if (error.response.status >= 500) {
      level = 'error';
    }

    notification[level]({ message: `${body.message}` });
  }
};
