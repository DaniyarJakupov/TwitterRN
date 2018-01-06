import { gql } from 'react-apollo';

export default gql`
  mutation likeTweet($_id: ID!) {
    likeTweet(_id: $_id) {
      _id
      likeCount
      isLiked
    }
  }
`;
