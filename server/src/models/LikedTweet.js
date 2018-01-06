/* @flow */
import mongoose, { Schema } from 'mongoose';

const LikedTweetSchema = new Schema({
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

LikedTweetSchema.index({ userId: 1 }, { unique: true });

export default mongoose.model('LikedTweet', LikedTweetSchema);
