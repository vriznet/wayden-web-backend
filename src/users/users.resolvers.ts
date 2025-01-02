import client from '../client';
import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Query: {
    users: () => client.user.findMany(),
    user: (_, { id }) => client.user.findUnique({ where: { id } }),
  },
  Mutation: {
    createUser: (_, { email, nick, password }) => {
      client.user.create({
        data: {
          email,
          nick,
          password,
        },
      });
      return { ok: true };
    },
    deleteUser: (_, { id }) => {
      client.user.delete({ where: { id } });
      return { ok: true };
    },
    updateUser: (_, { id, email, nick, password }) => {
      client.user.update({
        where: { id },
        data: {
          email,
          nick,
          password,
        },
      });
      return { ok: true };
    },
  },
};

export default resolvers;
