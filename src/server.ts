import { ApolloServer, gql } from 'apollo-server';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'bebe',
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(() => console.log('Server is running on http://localhost:4000'));
