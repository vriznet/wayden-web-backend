import client from '../client';
import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Query: {
    users: () => client.user.findMany(),
    user: (_, { id }) => client.user.findUnique({ where: { id } }),
  },
  Mutation: {
    createUser: (_, { email, nick }) =>
      client.user.create({
        data: {
          email,
          nick,
        },
      }),
    deleteUser: (_, { id }) => client.user.delete({ where: { id } }),
    updateUser: (_, { id, email, nick }) =>
      client.user.update({
        where: { id },
        data: {
          email,
          nick,
        },
      }),
  },
};

export default resolvers;
