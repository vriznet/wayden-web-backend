import client from '../../client';
import { Resolvers } from '../../types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const resolvers: Resolvers = {
  Mutation: {
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

        const token = jwt.sign(
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
