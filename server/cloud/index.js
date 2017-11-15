import ParseClient from 'parse/node';
// import randomstring from 'randomstring';

import { APP_ID, MASTER_KEY, HOST, PORT } from '../../config';

ParseClient.initialize(APP_ID);
ParseClient.masterKey = MASTER_KEY;
ParseClient.serverUrl = `http://${HOST}:${PORT}/parse`;

// Parse.Cloud.afterSave('company', async (req, res) => { // eslint-disable-line
//   if (req.object.isNew()) {
//     try {
//       let user = new ParseClient.User();
//       user.set('username', req.object.get('email'));
//       user.set('password', randomstring.generate(8));
//       user.set('email', req.object.get('email'));
//       user.addUnique('companies', req.object.id);
//       user = await user.signUp();
//
//       req.object.addUnique('users', user.id);
//       await req.object.save();
//     } catch (e) {  // eslint-disable-line
//     }
//   }
// });
