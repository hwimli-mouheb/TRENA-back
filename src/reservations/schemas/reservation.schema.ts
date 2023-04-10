/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TerrainSchema } from 'src/terrains/schemas/terrain.schema';
import { UserSchema } from 'src/users/schemas/users.schema';

export type ReservationDocument = Reservation & Document;
@Schema()
export class Reservation {
  @Prop({
    required: true,
    unique: true,
  })
  id: string;
  @Prop({ required: true, schema: UserSchema })
  user: string;
  @Prop({ required: true, schema: TerrainSchema })
  terrain: string;
  @Prop({ required: true, type: Date })
  date_d: Date;
  @Prop({ required: true, type: Date })
  date_f: Date;
  @Prop({ required: true })
  status: number;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
