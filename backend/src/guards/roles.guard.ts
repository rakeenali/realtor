import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GqlExecutionContext } from '@nestjs/graphql';

import { UserModel } from '../user/user.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  @InjectModel('User') private userModel: Model<UserModel>;

  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const ctx = GqlExecutionContext.create(context);
      const { req } = ctx.getContext();
      const roles = this.reflector.get<string[]>('roles', context.getHandler());

      const user = await this.userModel
        .findById(req.user.userId)
        .select('role')
        .lean()
        .exec();

      if (!user) {
        throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
      }

      const hasRole = roles.some(role => role === user.role);

      if (!hasRole) {
        throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
      }
      return hasRole;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
