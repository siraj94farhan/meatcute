import { ParseServer } from 'parse-server';
import * as config from '../config';

const api = new ParseServer({
  appName: config.APP_NAME,
  databaseURI: config.MONGODB_URI,
  cloud: `${__dirname}/../server/cloud/index.js`,
  appId: config.APP_ID,
  masterKey: config.MASTER_KEY,
  serverURL: `http://${config.HOST}:${config.PORT}/meatcute`,
  publicServerURL: `${config.PUBLIC_SERVER_URL}/`,
});

export default api;
