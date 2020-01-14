import { Document } from 'mongoose';

import { Flat, Bid } from '../graphql';

export interface FlatModel extends Document, Flat {
  _id: string;
}

export interface BidModel extends Document, Bid {
  _id: string;
}
