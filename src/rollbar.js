import Rollbar from 'rollbar';

// Tracking errors
Rollbar.init({
  accessToken: 'your_post_client_item_token',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'development',
  },
});

Rollbar.error('Hello world!');
