import client from '../../client';
import { Resolvers } from '../../types';
import bcrypt from 'bcrypt';

const resolver: Resolvers = {
  Mutation: {
    editProfile: async (_, { id, nick, email, password }) => {
      try {
        let uglyPassword = null;
        if (password) {
          uglyPassword = await bcrypt.hash(password, 10);
        }
        const updatedUser = await client.user.update({
          where: { id },
          data: {
            nick,
            email,
            ...(uglyPassword && { password: uglyPassword }),
          },
        });
        if (updatedUser) return { ok: true };
        return { ok: false, error: 'Could not update profile' };
      } catch (error) {
        console.error(error);
        return { ok: false, error: `${error}` };
      }
    },
  },
};

export default resolver;
