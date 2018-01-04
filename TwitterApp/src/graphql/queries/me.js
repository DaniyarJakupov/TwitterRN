import { gql } from 'react-apollo';

export default gql`
  {
    me {
      _id
      username
      email
      firstName
      lastName
      avatar
      createdAt
    }
  }
`;
