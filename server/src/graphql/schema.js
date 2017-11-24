/* @flow */
export default `
  scalar Date

  type Status {
    message: String!
  }

  type Tweet {
    _id: ID!
    text: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    firstName: String
    lastName: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Query {
    getTweets: [Tweet]
    getTweet(_id: ID!): Tweet
  }

  type Mutation {
    createTweet(text: String!): Tweet
    updateTweet(_id: ID!, text: String): Tweet
    deleteTweet(_id: ID!): Status
    signUp(email: String!, fullName: String!, password: String!, avatar: String, username: String): User
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
