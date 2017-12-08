/* @flow */
import GraphQLDate from 'graphql-date';
import TweetResolvers from './tweet-resolver';
import UserResolver from './user-resolver';

export default {
  Date: GraphQLDate,
  Query: {
    getTweet: TweetResolvers.getTweet,
    getTweets: TweetResolvers.getTweets,
    getUserTweets: TweetResolvers.getUserTweets,
    me: UserResolver.me,
  },
  Mutation: {
    createTweet: TweetResolvers.createTweet,
    updateTweet: TweetResolvers.updateTweet,
    deleteTweet: TweetResolvers.deleteTweet,
    signup: UserResolver.signup,
    login: UserResolver.login,
  },
};
