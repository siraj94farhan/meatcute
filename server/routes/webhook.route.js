import express from 'express';
import { testWebhook, messageRecieved } from '../controllers/webhook.controller';

const router = new express.Router();

router.route('/')
      .get(testWebhook)
      .post(messageRecieved);

export default router;    