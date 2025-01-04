import { Resolvers } from '../../types';
import bcrypt from 'bcrypt';
import { protectedResolver } from '../users.utils';

const resolver: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(
      async (_, { nick, email, password }, { loggedInUser, client }) => {
        try {
          let uglyPassword = null;
          if (password) {
            uglyPassword = await bcrypt.hash(password, 10);
          }
          const updatedUser = await client.user.update({
            where: { id: loggedInUser.id },
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
      }
    ),
  },
};

export default resolver;
