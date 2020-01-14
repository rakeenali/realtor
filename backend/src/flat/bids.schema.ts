import { Schema } from 'mongoose';

export const BidsSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  onFlat: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Flat',
  },
  bidBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});
