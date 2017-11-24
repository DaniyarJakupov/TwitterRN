/* @flow */
import GraphQLDate from 'graphql-date';
import TweetResolvers from './tweet-resolver';
import UserResolver from './user-resolver';

export default {
  Date: GraphQLDate,
  Query: {
    getTweets: TweetResolvers.getTweets,
    getTweet: TweetResolvers.getTweet,
  },
  Mutation: {
    createTweet: TweetResolvers.createTweet,
    updateTweet: TweetResolvers.updateTweet,
    deleteTweet: TweetResolvers.deleteTweet,
    signUp: UserResolver.signup,
    login: UserResolver.login,
  },
};
