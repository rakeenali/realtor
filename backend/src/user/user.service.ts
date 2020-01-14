import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { ApolloError } from 'apollo-server-express';
import * as jwt from 'jsonwebtoken';
import { uuid } from 'uuidv4';

import { UserInput, Authorization, User } from '../graphql';
import { IPayload, UserModel } from './user.interface';
import { FlatService } from '../flat/flat.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserModel>,
    private readonly flatService: FlatService,
  ) {}

  async generatePassword(password: string): Promise<string> {
    try {
      const hash = await bcrypt.genSalt(10);
      return bcrypt.hash(password, hash);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async checkPassword(plainPassword, hashPassword): Promise<Boolean> {
    const match = bcrypt.compare(plainPassword, hashPassword);
    return match;
  }

  generateToken(payload: IPayload): [string, string, number] {
    try {
      const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRY,
      });

      if (!accessToken) {
        throw new HttpException(
          'Error occured',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const expTime = new Date(
        new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
      ).getTime();
      const refreshToken = uuid();

      return [accessToken, refreshToken, expTime];
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getProfile(currentUser: IPayload): Promise<User> {
    try {
      const user = await this.userModel
        .findById(currentUser.userId)
        .lean()
        .exec();

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return await this.flatService.spreadUser(user);
    } catch (err) {
      throw new Error(err.messge);
    }
  }

  async refreshLogin(refreshToken: string): Promise<Authorization> {
    try {
      const user = await this.userModel
        .findOne({ 'refreshToken.token': refreshToken })
        .exec();

      if (!user) {
        throw new HttpException(
          'Token is either expired or blacklisted',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }

      const expTime = new Date(user.refreshToken.expTime).getTime();
      const currDate = new Date().getTime();

      if (!(expTime > currDate)) {
        throw new HttpException(
          'Refresh token is expired',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }

      const [
        accessToken,
        newRefreshToken,
        refreshTokenExpTime,
      ] = this.generateToken({ userId: user._id, role: user.role });

      user.refreshToken.token = newRefreshToken;
      user.refreshToken.expTime = refreshTokenExpTime;
      await user.save();

      return {
        accessToken,
        refreshToken: newRefreshToken,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async login(email: string, password: string): Promise<Authorization> {
    try {
      const user = await this.userModel.findOne({ email: email });

      if (!user) {
        throw new ApolloError('Invalid email or password', '404');
      }

      const passwordMatch = await this.checkPassword(password, user.password);

      if (!passwordMatch) {
        throw new ApolloError('Invalid email or password', '404');
      }

      const [
        accessToken,
        newRefreshToken,
        refreshTokenExpTime,
      ] = this.generateToken({ userId: user._id, role: user.role });

      user.refreshToken.token = newRefreshToken;
      user.refreshToken.expTime = refreshTokenExpTime;
      await user.save();

      return {
        accessToken: accessToken,
        refreshToken: newRefreshToken,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async createUser(createUserDto: UserInput): Promise<User> {
    try {
      const emailExist = await this.userModel
        .findOne({ email: createUserDto.email })
        .exec();
      if (emailExist) {
        throw new Error('Email already exist');
      }

      const userData = {
        ...createUserDto,
        password: await this.generatePassword(createUserDto.password),
        role: 'realtor',
      };

      const user = new this.userModel(userData);
      await user.save();
      return {
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        password: '',
        email: user.id,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

// nowdate = new Date()
// Sat Dec 21 2019 19:27:59 GMT+0500 (Pakistan Standard Time)
// tokendat = new Date(1576938544 * 1000)
// Sat Dec 21 2019 19:29:04 GMT+0500 (Pakistan Standard Time)
// nowdate.getTime() > tokendat.getTime()
// false
// nowdate.getTime() > tokendat.getTime()
// false
// nowdate = new Date()
// Sat Dec 21 2019 19:29:21 GMT+0500 (Pakistan Standard Time)
// nowdate.getTime() > tokendat.getTime()
// true
