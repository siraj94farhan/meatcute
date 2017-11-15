import Parse from 'parse/node';

import { APP_ID, MASTER_KEY, HOST, PORT } from '../../../config';

Parse.initialize(APP_ID);
Parse.masterKey = MASTER_KEY;
Parse.serverUrl = `http://${HOST}:${PORT}/parse`;

const Organization = Parse.Object.extend('organization');

const resolvers = {
  Query: {
    users: async (_, { limit, skip }) => {
      const users = await new Parse.Query(Parse.User)
                                  .skip(skip)
                                  .limit(limit)
                                  .find();
      return users.map(user => user.toJSON());
    },

    user: async (_, { id }) => {
      const user = await new Parse.Query(Parse.User)
                                       .get(id);
      return user.toJSON();
    },
  },

  User: {
    organization: async (user) => {
      const organization = await new Parse.Query(Organization).get(user.organization_id);
      return organization.toJSON();
    },
  },
};

export default resolvers;
