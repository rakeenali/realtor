import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { FlatService } from './flat.service';
import { FlatInput, Flat, Message, Bid } from '../graphql';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../user/roles.decorator';
import { IPayload } from '../user/user.interface';
import { CurrentUser } from '../user/user.decorator';

@Resolver('flat')
export class FlatResolver {
  constructor(private readonly flatService: FlatService) {}

  @Query('flats')
  async flats(): Promise<Flat[]> {
    return await this.flatService.flats();
  }

  @Mutation('createFlat')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('realtor')
  async createFlat(
    @Args('input') flatInput: FlatInput,
    @CurrentUser() currentUser: IPayload,
  ): Promise<Flat> {
    return await this.flatService.createFlat(flatInput, currentUser);
  }

  @Mutation('placeABid')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('bidder')
  async placeABid(
    @Args('flatId') flatId: string,
    @Args('bidAmount') bidAmount: number,
    @CurrentUser() currentUser: IPayload,
  ): Promise<Bid> {
    return await this.flatService.placeABid(flatId, bidAmount, currentUser);
  }

  @Mutation('retractABid')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('bidder')
  async retractABid(
    @Args('bidId') bidId: string,
    @CurrentUser() currentUser: IPayload,
  ): Promise<Message> {
    return await this.flatService.retractABid(bidId, currentUser.userId);
  }

  @Mutation('removeFlat')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('realtor')
  async removeFlat(
    @Args('flatId') flatId: string,
    @CurrentUser() currentUser: IPayload,
  ): Promise<Message> {
    return await this.flatService.removeFlat(flatId, currentUser.userId);
  }
}
