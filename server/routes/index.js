import express from 'express';

import cors from 'cors';

import webhook from './webhook.route';

const router = new express.Router();

router.use('/webhook', cors(), webhook);
router.use('/', (req, res) => res.send('Webhook\'s Server is running'));

export default router;
