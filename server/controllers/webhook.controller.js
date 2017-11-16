import Parse from 'parse/node';

import { sendQuickReplyButtons } from '../helpers/message.helper';

import { APP_ID, MASTER_KEY, HOST, PORT } from '../../config';

Parse.initialize(APP_ID);
Parse.masterKey = MASTER_KEY;
Parse.serverUrl = `http://${HOST}:${PORT}/meatcute`;

export async function testWebhook(req, res) {
  const VERIFY_TOKEN = 'THIS_IS_VERIFY_TOKEN_FOR_MESSAGER_BOT_CALLED_MEATCUTE';

    // Parse the query params
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request\
      return res.status(200).send(challenge);
    }
      // Responds with '403 Forbidden' if verify tokens do not match
    return res.sendStatus(403);
  }
  return res.json(req.query);
}

export async function messageRecieved(req, res) {
  const { entry: entries } = req.body;

  entries.map((entry) => {
    const { messaging: messagings } = entry;
    return messagings.map((messaging) => {
      const { sender: { id: senderId }, postback, message } = messaging;
      if (postback) {
        return handlePostback(senderId, postback);
      }
      return handleMessage(senderId, message);
    });
  });
  res.sendStatus(200);
}

async function handlePostback(senderId, postback) {
  const { payload } = postback;
  switch (payload) {
    case 'GET_STARTED':
      sendQuickReplyButtons(senderId, 'Select your language', [
        {
          content_type: 'text',
          payload: 'ENGLISH',
          title: 'English',
        },
        {
          content_type: 'text',
          payload: 'KANNADA',
          title: '\u0C95\u0CA8\u0CCD\u0CA8\u0CA1',
        },
        {
          content_type: 'text',
          payload: 'HINDI',
          title: '\u0939\u093F\u0928\u094D\u0926\u0940',
        },
      ]);
      break;
    default:
      break;
  }
}

async function handleMessage(message) {

}
