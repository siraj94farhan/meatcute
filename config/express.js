import {
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';

import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';

import schema from '../server/schemas';
import parse from './parse';
import routes from '../server/routes';

const app = express();

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(allowCrossDomain);
app.use('/public', express.static(path.join(__dirname, '/../public')));

app.use('/graphql', cors(), bodyParser.json(), graphqlExpress({
  schema,
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.use('/parse', parse);

app.use('/', routes);


export default app;
