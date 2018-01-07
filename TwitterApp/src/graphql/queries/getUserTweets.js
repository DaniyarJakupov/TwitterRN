import { gql } from 'react-apollo';

export default gql`
  {
    getUserTweets {
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
