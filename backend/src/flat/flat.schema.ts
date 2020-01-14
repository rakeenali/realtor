import { Schema } from 'mongoose';

export const FlatSchema = new Schema({
  createdAt: {
    required: true,
    type: Date,
    default: Date.now,
  },
  rooms: {
    required: true,
    type: Number,
  },
  flatImage: {
    required: true,
    type: String,
  },
  area: {
    required: true,
    type: Number,
  },
  flatAddress: {
    required: true,
    type: String,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  bidsMade: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Bid',
    },
  ],
});
