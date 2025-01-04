import { Resolvers } from '../../types';
import bcrypt from 'bcrypt';

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (_, { email, nick, password }, { client }) => {
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
  },
};

export default resolvers;
