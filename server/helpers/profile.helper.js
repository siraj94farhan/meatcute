import request from 'request-promise';
import Parse from 'parse/node';

import { APP_ID, MASTER_KEY, HOST, PORT, FB_PAGE_ACCESS_TOKEN } from '../../config';

Parse.initialize(APP_ID);
Parse.masterKey = MASTER_KEY;
Parse.serverUrl = `http://${HOST}:${PORT}/parse`;

console.log(`http://${HOST}:${PORT}/parse`);

const Profile = Parse.Object.extend('profile');

export async function saveProfileToDB(senderId) {
  try {
    const fields = 'first_name,last_name,gender,profile_pic,locale';
    const options = {
      uri: `https://graph.facebook.com/v2.6/${senderId}?fields=${fields}&access_token=${FB_PAGE_ACCESS_TOKEN}`,
      json: true,
    };
    const { first_name, last_name, gender, profile_pic, locale, id } = await request(options);
    let profileObj = await new Parse.Query(Profile).equalTo('facebook_id', senderId).first();
    console.log('TEST HERE');
    console.log(profileObj);
    if (!profileObj) {
      profileObj = new Profile();
      profileObj.set('first_name', first_name);
      profileObj.set('last_name', last_name);
      profileObj.set('gender', gender);
      profileObj.set('profile_pic', profile_pic);
      profileObj.set('locale', locale);
      profileObj.set('facebook_id', id);
      console.log(profileObj.toJSON());
      await profileObj.save();
    }
  } catch (e) {
    console.log(e);
  }
}
