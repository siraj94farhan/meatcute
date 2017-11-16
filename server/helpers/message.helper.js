import request from 'request-promise';

import { FB_PAGE_ACCESS_TOKEN } from '../../config';

export async function sendQuickReplyButtons(recipientId, quickReplyText, quickReplies) {
  const body = {
    recipient: {
      id: recipientId,
    },
    message: {
      text: quickReplyText,
      quick_replies: quickReplies,
    },
  };
  const options = {
    uri: `https://graph.facebook.com/v2.6/me/messages?access_token=${FB_PAGE_ACCESS_TOKEN}`,
    body,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    json: true,
  };

  await request(options);
}
