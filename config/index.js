require('dotenv').config();

export const APP_ID = process.env.PARSE_SERVER_APPLICATION_ID;
export const MASTER_KEY = process.env.PARSE_SERVER_MASTER_KEY;
export const HOST = process.env.HOST;
export const PORT = process.env.PORT;

export const APP_NAME = process.env.APP_NAME;
export const MONGODB_URI = process.env.DB_MONGODB_URI;

export const SERVER_URL = process.env.PARSE_SERVER_URL;

export const PUBLIC_SERVER_URL = process.env.PUBLIC_SERVER_URL;
export const PUBLIC_DASHBOARD_URL = process.env.PUBLIC_DASHBOARD_URL;

export const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
export const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
export const MAIL_FROM_ADDRESS = process.env.MAILGUN_FROM_ADDRESS;

export const INVITATION_TOKEN_VALIDITY_DURATION = process.env.PASSWORD_RESET_VALIDITY_DURATION;
export const MAIL_VERIFICATION_VALIDITY_DURATION = process.env.MAIL_VERIFICATION_VALIDITY_DURATION;
export const PASSWORD_RESET_VALIDITY_DURATION = process.env.PASSWORD_RESET_VALIDITY_DURATION;

export const GMAIL_USERNAME = process.env.GMAIL_USERNAME;
export const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;

export const FB_PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;