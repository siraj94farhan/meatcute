import express from 'express';
import { testWebhook } from '../controllers/webhook.controller';

const router = new express.Router();

router.route('/')
      .get(testWebhook);

export default router;
