import { gql } from 'react-apollo';

export default gql`
  subscription {
    tweetAdded {
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
