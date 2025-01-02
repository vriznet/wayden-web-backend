import { gql } from 'apollo-server';

export default gql`
  type User {
    id: Int!
    email: String
    nick: String!
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    users: [User]
    user(id: Int!): User
  }
  type Mutation {
    createUser(email: String!, nick: String!): User
    deleteUser(id: Int!): User
    updateUser(id: Int!, email: String, nick: String): User
  }
`;
