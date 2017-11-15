import {
  makeExecutableSchema,
} from 'graphql-tools';

import User from './user';

import resolvers from '../resolvers';

const schema = makeExecutableSchema(
  { typeDefs: [
    User,
  ],
    resolvers });
export default schema;
