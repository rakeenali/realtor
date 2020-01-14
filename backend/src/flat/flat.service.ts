import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { FlatModel, BidModel } from './flat.interface';
import { UserModel } from '../user/user.interface';
import { FlatInput, Flat, User, Bid, Message } from '../graphql';
import { IPayload } from '../user/user.interface';

@Injectable()
export class FlatService {
  constructor(
    @InjectModel('Flat') private readonly flatModel: Model<FlatModel>,
    @InjectModel('Bid') private readonly bidModel: Model<BidModel>,
    @InjectModel('User') private readonly userModel: Model<UserModel>,
  ) {}

  async spreadUser(userOrId: string | User): Promise<User> {
    try {
      let user;
      if (typeof userOrId === 'string') {
        user = await this.userModel
          .findById(userOrId)
          .lean()
          .exec();
      } else {
        user = userOrId;
      }

      const flatsPosted: Flat[] | [] =
        user.flatsPosted.length > 0
          ? await Promise.all(
              user.flatsPosted.map(async _id => {
                return await this.spreadFlat(String(_id));
              }),
            )
          : [];

      const bids: Bid[] | [] =
        user.bidsMade.length > 0
          ? await Promise.all(
              user.bidsMade.map(async _id => {
                return await this.spreadBid(String(_id));
              }),
            )
          : [];

      return {
        ...user,
        password: '',
        flatsPosted,
        bidsMade: bids,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async spreadBid(bidOrBidId: string | Bid): Promise<Bid> {
    try {
      let bid;
      if (typeof bidOrBidId === 'string') {
        bid = await this.bidModel
          .findById(bidOrBidId)
          .lean()
          .exec();
      } else {
        bid = bidOrBidId;
      }

      return {
        ...bid,
        onFlat: await this.spreadFlat.bind(this, String(bid.onFlat)),
        bidBy: await this.spreadUser.bind(this, String(bid.bidBy)),
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async spreadFlat(flatOrId: string | Flat): Promise<Flat> {
    try {
      let flat;
      if (typeof flatOrId === 'string') {
        flat = await this.flatModel
          .findById(flatOrId)
          .lean()
          .exec();
      } else {
        flat = flatOrId;
      }
      const bids: Bid[] | [] =
        flat.bidsMade.length > 0
          ? await Promise.all(
              flat.bidsMade.map(async _id => {
                return await this.spreadBid(String(_id));
              }),
            )
          : [];

      return {
        _id: flat._id,
        area: flat.area,
        createdAt: flat.createdAt,
        flatAddress: flat.flatAddress,
        flatImage: flat.flatImage,
        rooms: flat.rooms,
        createdBy: await this.spreadUser.bind(this, String(flat.createdBy)),
        bidsMade: bids,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async flats(): Promise<Flat[]> {
    try {
      const flats = await this.flatModel
        .find()
        .lean()
        .exec();

      return await Promise.all(
        flats.map(async flat => {
          return await this.spreadFlat(flat);
        }),
      );
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async createFlat(flatInput: FlatInput, currentUser: IPayload): Promise<Flat> {
    try {
      const flat = new this.flatModel({
        ...flatInput,
        createdBy: currentUser.userId,
      });

      await flat.save();

      await this.userModel.findByIdAndUpdate(currentUser.userId, {
        $push: {
          flatsPosted: flat._id,
        },
      });

      return await this.spreadFlat(String(flat._id));
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async placeABid(
    flatId: string,
    bidAmount: number,
    currentUser: IPayload,
  ): Promise<Bid> {
    try {
      const flat = await this.flatModel
        .findById(flatId)
        .lean()
        .exec();

      if (!flat) {
        throw new HttpException(
          `Flat with id ${flatId} does not exist`,
          HttpStatus.NOT_FOUND,
        );
      }

      const bid = new this.bidModel({
        amount: bidAmount,
        onFlat: flat._id,
        bidBy: currentUser.userId,
      });
      await bid.save();

      await this.userModel.findByIdAndUpdate(currentUser.userId, {
        $push: {
          bidsMade: bid._id,
        },
      });

      await this.flatModel.findByIdAndUpdate(
        flatId,
        {
          $push: {
            bidsMade: bid._id,
          },
        },
        { new: true },
      );

      return await this.spreadBid(String(bid._id));
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async retractABid(bidId: string, userId: string): Promise<Message> {
    try {
      const bid = await this.bidModel.findOneAndDelete({
        _id: bidId,
        bidBy: userId,
      });

      if (!bid) {
        throw new HttpException(
          `Bid with id ${bidId} does not exist`,
          HttpStatus.NOT_FOUND,
        );
      }

      await this.flatModel.findByIdAndUpdate(bid.onFlat, {
        $pull: {
          bidsMade: bidId,
        },
      });

      await this.userModel.findByIdAndUpdate(userId, {
        $pull: {
          bidsMade: bidId,
        },
      });

      return {
        message: 'Bid retracted successfully',
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async removeFlat(flatId: string, userId: string): Promise<Message> {
    try {
      const flat = await this.flatModel.findOneAndDelete({
        _id: flatId,
        createdBy: userId,
      });

      if (!flat) {
        throw new HttpException(
          `Flat with id ${flat} does not exist`,
          HttpStatus.NOT_FOUND,
        );
      }

      await this.userModel.findByIdAndUpdate(userId, {
        $pull: {
          flatsPosted: flatId,
        },
      });

      const bids = await this.bidModel.find({
        onFlat: flatId,
      });

      const bidsToDelete = bids.map(b => ({
        bId: b._id,
        uId: String(b.bidBy),
      }));

      await Promise.all(
        bidsToDelete.map(async ({ uId, bId }) => {
          await this.userModel.findByIdAndUpdate(uId, {
            $pull: {
              bidsMade: bId,
            },
          });
        }),
      );

      await this.bidModel.deleteMany({
        onFlat: flatId,
      });

      return {
        message: 'Flat deleted successfully',
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
