import jwt from 'jsonwebtoken';
import client from '../client';
import { Context, Resolver } from '../types';

export const getUser = async (token: string | undefined) => {
  try {
    if (!token) return null;

    const verifiedToken: any = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    );
    if ('id' in verifiedToken) {
      const { id } = verifiedToken;
      const user = await client.user.findUnique({ where: { id } });

      if (user) return user;
    }
    return null;
  } catch {
    return null;
  }
};

export const protectedResolver =
  (ourResolver: Resolver) =>
  (root: any, args: any, context: Context, info: any) => {
    if (!context.loggedInUser) {
      const operation = info.operation.operation;
      if (operation === 'query') {
        return null;
      } else if (operation === 'mutation') {
        return {
          ok: false,
          error: 'Please log in to perform this action.',
        };
      }
    }
    return ourResolver(root, args, context, info);
  };
