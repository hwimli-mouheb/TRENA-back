import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { UserDetails } from './user-details.interface';

import { User, UserDocument } from './schemas/users.schema';
import { UserRepository } from './users.repository';
import { NewUserDTO } from './dtos/new-user.dto';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { AuthService } from 'src/auth/auth.service';
import { UserRoleEnum } from 'src/enums/user-role.enum';

@Injectable()
export class UsersService {
  constructor(
    // private authService: AuthService,
    private readonly userRepository: UserRepository,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  _getUserDetails(user: UserDocument): UserDetails {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDetails | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    return this._getUserDetails(user);
  }

  async create(
    name: string,
    email: string,
    hashedPassword: string,
    role: string,
  ): Promise<UserDocument> {
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return newUser.save();
  }
  async findAll(): Promise<User[] | null> {
    return this.userRepository.find({});
  }

  async register(user: Readonly<NewUserDTO>): Promise<UserDetails | any> {
    const { name, email, password, role } = user;

    //email should be unique
    const existingUser = await this.findByEmail(email);

    if (existingUser)
      throw new HttpException(
        'Email déjà utilisé,veuillez réessayer.',
        HttpStatus.CONFLICT,
      );

    // const hashedPassword = await this.authService.hashPassword(password);

    const newUser = await this.create(name, email, password, role);
    return newUser;
  }
  async deleteUser(user: User, userEmail: string): Promise<UserDetails | any> {
    if (user?.role === UserRoleEnum.ADMIN)
      return this.userRepository.findOneAndDelete({ userEmail });
    return new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
