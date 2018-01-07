import { gql } from 'react-apollo';

import FeedCard from '../../components/FeedCards/FeedCard';

export default gql`
  subscription {
    tweetAdded {
      ...FeedCard
    }
  }
  ${FeedCard.fragments.tweet}
`;
