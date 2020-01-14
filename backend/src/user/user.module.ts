import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserSchema } from './user.schema';

import { FlatService } from '../flat/flat.service';
import { FlatSchema } from '../flat/flat.schema';
import { BidsSchema } from '../flat/bids.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      {
        name: 'Flat',
        schema: FlatSchema,
      },
      {
        name: 'Bid',
        schema: BidsSchema,
      },
    ]),
  ],
  providers: [FlatService, UserService, UserResolver],
})
export class UserModule {}
