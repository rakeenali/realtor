import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['bidder', 'realtor'],
    default: 'bidder',
  },
  bidsMade: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Bid',
    },
  ],
  flatsPosted: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Flat',
    },
  ],
  refreshToken: {
    token: {
      type: String,
    },
    expTime: {
      type: Date,
    },
  },
});
