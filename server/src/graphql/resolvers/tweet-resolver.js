/* @flow */
import Tweet from '../../models/Tweet';
import LikeTweet from '../../models/LikeTweet';
import { requireAuth } from '../../services/auth';
import { pubsub } from '../../config/pubsub';

const TWEET_ADDED = 'tweetAdded';
export const TWEET_LIKED = 'tweetLiked';

export default {
  getTweet: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      return Tweet.findById(_id);
    } catch (error) {
      throw error;
    }
  },

  // This resolver returns an array of tweets with additional isLiked property added to each one of it
  getTweets: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      const p1 = Tweet.find({}).sort({ createdAt: -1 });
      const p2 = LikeTweet.findOne({ userId: user._id });

      const [tweets, likes] = await Promise.all([p1, p2]);

      const tweetsToSend = tweets.reduce((arr, tweet) => {
        const tw = tweet.toJSON();

        if (likes.tweets.some(t => t.equals(tweet._id))) {
          arr.push({
            ...tw,
            isLiked: true,
          });
        } else {
          arr.push({
            ...tw,
            isLiked: false,
          });
        }
        return arr;
      }, []);

      return tweetsToSend;
    } catch (error) {
      throw error;
    }
  },

  getUserTweets: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      return Tweet.find({ user: user._id }).sort({ createdAt: -1 });
    } catch (error) {
      throw error;
    }
  },

  createTweet: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      const tweet = await Tweet.create({ ...args, user: user._id });

      pubsub.publish(TWEET_ADDED, { [TWEET_ADDED]: tweet });

      return tweet;
    } catch (error) {
      throw error;
    }
  },

  updateTweet: async (_, { _id, ...rest }, { user }) => {
    try {
      await requireAuth(user);
      const tweet = await Tweet.findOne({ _id, user: user._id });
      if (!tweet) {
        throw new Error('Not found!');
      }
      Object.entries(rest).forEach(([key, value]) => {
        tweet[key] = value;
      });
      return tweet.save();
    } catch (error) {
      throw error;
    }
  },

  deleteTweet: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      const tweet = await Tweet.findOne({ _id, user: user._id });

      if (!tweet) {
        throw new Error('Not found!');
      }
      await tweet.remove();
      return {
        message: 'Tweet was deleted!',
      };
    } catch (error) {
      throw error;
    }
  },

  likeTweet: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      const likes = await LikeTweet.findOne({ userId: user._id });

      return likes.userLikedTweet(_id);
    } catch (error) {
      throw error;
    }
  },

  /* SUBSCRIPTIONS */
  tweetAdded: {
    subscribe: () => pubsub.asyncIterator(TWEET_ADDED),
  },
  tweetLiked: {
    subscribe: () => pubsub.asyncIterator(TWEET_LIKED),
  },
};
