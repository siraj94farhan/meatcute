import request from 'request-promise';
import { HOST, PORT, APP_ID } from '../../config';

export async function authenticateUser(req, res, next) {
  const sessionToken = req.get('X-Session-Token') || req.headers;
  const options = {
    uri: `http://${HOST}:${PORT}/parse/users/me`,
    headers: {
      'X-Parse-Session-Token': sessionToken,
      'X-Parse-Application-Id': APP_ID,
    },
    json: true,
  };

  try {
    const user = await request(options);

    req.user = user;

    return next();
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
}
