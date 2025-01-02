import { gql } from 'apollo-server';

export default gql`
  type Mutation {
    editProfile(
      id: String!
      nick: String
      email: String
      password: String
    ): MutationResponse!
  }
`;
