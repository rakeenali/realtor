import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FlatResolver } from './flat.resolver';
import { FlatService } from './flat.service';

import { BidsSchema } from './bids.schema';
import { FlatSchema } from './flat.schema';
import { UserSchema } from '../user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
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
  providers: [FlatResolver, FlatService],
})
export class FlatModule {}
