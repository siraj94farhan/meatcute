import request from 'request-promise';
import Parse from 'parse/node';

import { APP_ID, MASTER_KEY, HOST, PORT, FB_PAGE_ACCESS_TOKEN } from '../../config';

Parse.initialize(APP_ID);
Parse.masterKey = MASTER_KEY;
Parse.serverUrl = `http://${HOST}:${PORT}/meatcute`;

const Profile = Parse.Object.extend('profile');

export async function saveProfileToDB(senderId) {
  try {
    const fields = 'first_name,last_name,gender,profile_pic,locale';
    const options = {
      uri: `https://graph.facebook.com/v2.6/${senderId}?fields=${fields}&access_token=${FB_PAGE_ACCESS_TOKEN}`,
      json: true,
    };
    const profile = await request(options);
    let profileObj = await new Parse.Query(Profile).equalTo('facebook_id', senderId).first();
    if (!profileObj) {
      profile.facebook_id = senderId;
      delete profile.id;
      profileObj = new Profile();
      profileObj.set(profile);
      await profileObj.save();
    }
  } catch (e) {
    console.log(e);
  }
}
