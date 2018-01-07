import { gql } from 'react-apollo';

export default gql`
  subscription {
    tweetLiked {
      _id
      likeCount
    }
  }
`;
