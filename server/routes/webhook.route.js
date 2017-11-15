import express from 'express';
import { createOrganization } from '../controllers/webhook.controller';

const router = new express.Router();

router.route('/')
      .post(createOrganization);

export default router;
