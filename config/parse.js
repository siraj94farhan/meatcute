import { ParseServer } from 'parse-server';
import * as config from '../config';

const api = new ParseServer({
  appName: config.APP_NAME,
  databaseURI: config.MONGODB_URI,
  cloud: `${__dirname}/../server/cloud/index.js`,
  appId: config.APP_ID,
  masterKey: config.MASTER_KEY,
  serverURL: `http://${config.HOST}:${config.PORT}/parse`,
  publicServerURL: `${config.PUBLIC_SERVER_URL}/`,
  verifyUserEmails: false,
  emailVerifyTokenValidityDuration: config.MAIL_VERIFICATION_VALIDITY_DURATION,
  emailAdapter: {
    module: 'parse-server-simple-mailgun-adapter',
    options: {
      fromAddress: config.MAIL_FROM_ADDRESS,
      domain: config.MAILGUN_DOMAIN,
      apiKey: config.MAILGUN_API_KEY,
    },
  },
});

export default api;
