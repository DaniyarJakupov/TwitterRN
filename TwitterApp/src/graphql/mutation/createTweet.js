import { gql } from 'react-apollo';

import FeedCard from '../../components/FeedCards/FeedCard';

export default gql`
  mutation createTweet($text: String!) {
    createTweet(text: $text) {
      ...FeedCard
    }
  }
  ${FeedCard.fragments.tweet}
`;
