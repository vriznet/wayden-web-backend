import client from '../client';
import { Resolvers } from '../types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
    createAccount: async (_, { email, nick, password }) => {
      try {
        const existingNick = await client.user.findFirst({
          where: { nick },
        });

        const existingEmail = await client.user.findFirst({
          where: { email },
        });

        if (existingNick) {
          throw new Error(`
						${existingNick ? 'username ' : ''}
						${existingEmail ? 'email ' : ''}is already taken.
          `);
        }

        const uglyPassword = await bcrypt.hash(password, 10);

        await client.user.create({
          data: {
            email,
            nick,
            password: uglyPassword,
          },
        });

        return { ok: true };
      } catch (error) {
        console.error(error);
        return { ok: false, error: `${error}` };
      }
    },
    login: async (__dirname, { email, password }) => {
      try {
        const user = await client.user.findFirst({ where: { email } });

        if (!user) {
          return {
            ok: false,
            error: 'User not found',
          };
        }

        const passwordOk = await bcrypt.compare(password, user.password);

        if (!passwordOk) {
          return {
            ok: false,
            error: 'Incorrect password',
          };
        }

        const token = await jwt.sign(
          { id: user.id },
          process.env.SECRET_KEY as string
        );

        return { ok: true, token };
      } catch (error) {
        console.error(error);
        return { ok: false, error: `${error}` };
      }
    },
  },
};

export default resolvers;
