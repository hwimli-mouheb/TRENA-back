/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type TerrainDocument = Terrain & Document;
@Schema()
export class Terrain {
  @Prop({
    required: true,
    unique: true,
  })
  id: string;

  @Prop({
    required: true,
  })
  description: string;
  @Prop({
    required: true,
  })
  sport: number;
  @Prop({
    required: true,
  })
  address: string;
  @Prop({
    required: true,
  })
  surface: number;
  @Prop({
    required: true,
  })
  available: boolean;
  @Prop({
    required: true,
  })
  price: number;
  @Prop({
    required: true,
  })
  image: string;
}
export const TerrainSchema = SchemaFactory.createForClass(Terrain);
