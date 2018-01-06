/* @flow */
import mongoose, { Schema } from 'mongoose';

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

export default mongoose.model('LikeTweet', LikeTweetSchema);
