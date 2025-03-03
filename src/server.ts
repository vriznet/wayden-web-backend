require('dotenv').config();

import { ApolloServer } from 'apollo-server';
import schema from './schema';
import client from './client';
import { getUser } from './users/users.utils';

const PORT = process.env.PORT;

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token as string | undefined),
      client,
    };
  },
});

server
  .listen(PORT)
  .then(() => console.log(`Server is running on http://localhost:${PORT}`));
