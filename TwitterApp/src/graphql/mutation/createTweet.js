import { gql } from 'react-apollo';

export default gql`
  mutation createTweet($text: String!) {
    createTweet(text: $text) {
      _id
      likeCount
      isLiked
      createdAt
      text
      user {
        avatar
        username
        firstName
        lastName
      }
    }
  }
`;
