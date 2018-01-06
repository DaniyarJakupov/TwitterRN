/* @flow */
import mongoose, { Schema } from 'mongoose';

const TweetSchema = new Schema(
  {
    text: {
      type: String,
      minlength: [1, 'Tweet is too short'],
      maxlength: [284, 'Tweet is too long'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

TweetSchema.statics = {
  incrementLikeCount(tweetId) {
    return this.findByIdAndUpdate(tweetId, { $inc: { likeCount: 1 } }, { new: true });
  },
  decrementLikeCount(tweetId) {
    return this.findByIdAndUpdate(tweetId, { $inc: { likeCount: -1 } }, { new: true });
  },
};

export default mongoose.model('Tweet', TweetSchema);
