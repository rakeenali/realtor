import { Model, Document } from 'mongoose';

import { User } from '../graphql';

export interface IPayload {
  userId: string;
  role: string;
}
export interface UserModel extends Document, User {
  _id: string;
}
