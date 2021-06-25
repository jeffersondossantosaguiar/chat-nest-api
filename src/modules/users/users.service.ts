import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { UserPayload } from './models/user-payload';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) { }

  public async create(payload: UserPayload): Promise<UserPayload> {
    const {
      name,
      email,
      password,
      avatar_url
    } = payload;

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
      avatar_url
    });

    const user = await createdUser.save().catch((err) => {
      if (err.code === 11000) {
        throw new BadRequestException('Email já cadastrado');
      }
      throw new BadRequestException(err);
    });

    user.password = undefined;

    return user;
  }

  async findOne(email: string): Promise<User> {
    const user = this.userModel.findOne({ email: email });

    if (!user)
      throw new BadRequestException('User not found');

    return user;
  }

  async findUserById(userId: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: userId });

    delete user.password;

    return user;
  }

  async getFriends(userId: string): Promise<any> {
    const friends = [
      {
        _id: "60d4bc0acf842498bd0529d0",
        name: "John Doe",
        avatar_url: "https://i.pravatar.cc/300?img=60"
      },
      {
        _id: "60d4c253f63345a098003519",
        name: "Maria Smith",
        avatar_url: "https://i.pravatar.cc/300?img=47"
      },
      {
        _id: "60d4d4bf08cfcabc6bd8c170",
        name: "Paul Neither",
        avatar_url: "https://i.pravatar.cc/300?img=51"
      }
    ];

    return friends.filter(friend => friend._id !== userId);
  }
}