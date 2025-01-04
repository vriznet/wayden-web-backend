import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Query: {
    users: (_, __, { client }) => client.user.findMany(),
    user: (_, { id }, { client }) => client.user.findUnique({ where: { id } }),
  },
  Mutation: {
    createUser: (_, { email, nick, password }, { client }) => {
      client.user.create({
        data: {
          email,
          nick,
          password,
        },
      });
      return { ok: true };
    },
    deleteUser: (_, { id }, { client }) => {
      client.user.delete({ where: { id } });
      return { ok: true };
    },
    updateUser: (_, { id, email, nick, password }, { client }) => {
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
