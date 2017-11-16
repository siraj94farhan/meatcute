import { sendQuickReplyButtons } from '../helpers/message.helper';
import { saveProfileToDB, changeLanguage } from '../helpers/db.helper';
import {getCategoryQuickReplies, getLanguageQuickReplies} from './quick-replies.helpers';

export async function onGetStartedPostback(senderId) {
  await saveProfileToDB(senderId);
  sendQuickReplyButtons(senderId, 'Select your language', getLanguageQuickReplies());
}

export async function onLanguageSelectionPostback(senderId, language) {
  await changeLanguage(senderId, language);
  sendQuickReplyButtons(senderId, 'What you want to buy?', getCategoryQuickReplies());
}
