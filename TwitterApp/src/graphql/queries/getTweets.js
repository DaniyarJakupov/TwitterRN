import { gql } from 'react-apollo';

export default gql`
  {
    getTweets {
      text
      _id
      createdAt
      likeCount
      isLiked
      user {
        username
        avatar
        lastName
        firstName
      }
    }
  }
`;
