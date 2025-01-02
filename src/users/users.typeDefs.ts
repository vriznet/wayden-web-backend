import { gql } from 'apollo-server';

export default gql`
  type LoginResult {
    ok: Boolean!
    token: String
    error: String
  }
  type User {
    id: Int!
    email: String!
    nick: String!
    password: String!
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    users: [User]
    user(id: Int!): User
  }
  type Mutation {
    createUser(
      email: String!
      nick: String!
      password: String!
    ): MutationResponse!
    deleteUser(id: Int!): MutationResponse!
    updateUser(
      id: Int!
      email: String
      nick: String
      password: String
    ): MutationResponse!
  }
`;
