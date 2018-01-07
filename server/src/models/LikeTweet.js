/* @flow */
import mongoose, { Schema } from 'mongoose';
import Tweet from './Tweet';

import { pubsub } from '../config/pubsub';
import { TWEET_LIKED } from '../graphql/resolvers/tweet-resolver';

const LikeTweetSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  tweets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tweet',
    },
  ],
});

LikeTweetSchema.index({ userId: 1 }, { unique: true });

LikeTweetSchema.methods = {
  async userLikedTweet(tweetId) {
    if (this.tweets.some(tweet => tweet.equals(tweetId))) {
      this.tweets.pull(tweetId); // remove tweet from LikeTweet collection
      await this.save();

      const tweet = await Tweet.decrementLikeCount(tweetId);
      const t = tweet.toJSON();

      pubsub.publish(TWEET_LIKED, { [TWEET_LIKED]: { ...t } });

      return {
        isLiked: false,
        ...t,
      };
    }

    const tweet = await Tweet.incrementLikeCount(tweetId);
    const t = tweet.toJSON();

    this.tweets.push(tweetId); // add tweet to LikeTweet collection
    await this.save();

    pubsub.publish(TWEET_LIKED, { [TWEET_LIKED]: { ...t } });

    return {
      isLiked: true,
      ...t,
    };
  },
};

export default mongoose.model('LikeTweet', LikeTweetSchema);
