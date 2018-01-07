import { gql } from 'react-apollo';

import FeedCard from '../../components/FeedCards/FeedCard';

export default gql`
  {
    getUserTweets {
      ...FeedCard
    }
  }
  ${FeedCard.fragments.tweet}
`;
