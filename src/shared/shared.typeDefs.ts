import { gql } from 'apollo-server-express';

export default gql`
  scalar JSON

  type MutationResponse {
    ok: Boolean!
    error: String
  }
`;
