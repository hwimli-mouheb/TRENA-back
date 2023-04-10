/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRoleEnum } from 'src/enums/user-role.enum';
export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ enum: UserRoleEnum })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
