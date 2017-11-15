import Parse from 'parse/node';

import { APP_ID, MASTER_KEY, HOST, PORT } from '../../config';

Parse.initialize(APP_ID);
Parse.masterKey = MASTER_KEY;
Parse.serverUrl = `http://${HOST}:${PORT}/meatcute`;

export async function testWebhook(req, res) {
  let VERIFY_TOKEN = 'THIS_IS_VERIFY_TOKEN_FOR_MESSAGER_BOT_CALLED_MEATCUTE';
  
  
  console.log('TESTING');  
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
  
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
    res.sendStatus(403);
  }
}
