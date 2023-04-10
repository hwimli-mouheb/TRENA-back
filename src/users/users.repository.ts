/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
  ) {}
  async findOne(UserFilterQuery: FilterQuery<User>): Promise<User> {
    return this.UserModel.findOne(UserFilterQuery);
  }

  async find(UserFilterQuery: FilterQuery<User>): Promise<User[]> {
    return this.UserModel.find(UserFilterQuery);
  }

  async create(User: User): Promise<User> {
    const newUser = new this.UserModel(User);
    return newUser.save();
  }

  async findOneAndUpdate(
    UserFilterQuery: FilterQuery<User>,
    User: Partial<User>,
  ): Promise<User> {
    return this.UserModel.findOneAndUpdate(UserFilterQuery, User, {
      new: true,
    });
  }
  async findOneAndDelete(
    UserFilterQuery: FilterQuery<User>,
  ): Promise<User> {
    return this.UserModel.findOneAndDelete(UserFilterQuery);
  }
  async count(options) {
    return this.UserModel.count(options).exec();
  }
}
