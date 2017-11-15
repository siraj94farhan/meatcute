import User from './schema';

const UserQuery = `
  type Query {
    users(limit: Int = 10, skip: Int = 0): [User],
    user(id: String!): User,
  }`;

export default () => [User, UserQuery];
