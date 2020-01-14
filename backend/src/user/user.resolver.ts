import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import {
  UserInput,
  Authorization,
  Message,
  User as GrpaqlUser,
} from '../graphql';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from './user.decorator';
import { IPayload } from './user.interface';

@Resolver('user')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('login')
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<Authorization> {
    return this.userService.login(email, password);
  }

  @Query('profile')
  @UseGuards(AuthGuard)
  async profile(@CurrentUser() currentUser: IPayload): Promise<GrpaqlUser> {
    try {
      return await this.userService.getProfile(currentUser);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  @Mutation('refreshLogin')
  async refreshLogin(
    @Args('refreshToken') refreshToken: string,
  ): Promise<Authorization> {
    return await this.userService.refreshLogin(refreshToken);
  }

  @Mutation('createUser')
  async createUser(@Args('input') input: UserInput): Promise<Message> {
    try {
      await this.userService.createUser(input);
      return {
        message: 'User created successfully you can now login',
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
