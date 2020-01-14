import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GqlExecutionContext } from '@nestjs/graphql';
import jwt from 'jsonwebtoken';

import { User } from '../graphql';
import { UserService } from '../user/user.service';
import { IPayload, UserModel } from '../user/user.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  @InjectModel('User') private userModel: Model<UserModel>;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    let token: string = req.headers.authorization;
    token = token.split(' ')[1];
    try {
      const data: any = jwt.verify(token, process.env.TOKEN_SECRET);

      const user: User = await this.userModel
        .findById(data.userId)
        .lean()
        .exec();

      if (!user) {
        throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
      }
      req.user = {
        userId: user._id,
        role: user.role,
      };
      return true;
    } catch (err) {
      throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
