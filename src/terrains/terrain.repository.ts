/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Terrain, TerrainDocument } from './schemas/terrain.schema';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class TerrainRepository {
  constructor(
    @InjectModel(Terrain.name) private terrainModel: Model<TerrainDocument>,
  ) {}
  async findOne(terrainFilterQuery: FilterQuery<Terrain>): Promise<Terrain> {
    return this.terrainModel.findOne(terrainFilterQuery);
  }

  async find(terrainFilterQuery: FilterQuery<Terrain>): Promise<Terrain[]> {
    return this.terrainModel.find(terrainFilterQuery);
  }

  async create(terrain: Terrain): Promise<Terrain> {
    const newTerrain = new this.terrainModel(terrain);
    return newTerrain.save();
  }

  async findOneAndUpdate(
    terrainFilterQuery: FilterQuery<Terrain>,
    terrain: Partial<Terrain>,
  ): Promise<Terrain> {
    return this.terrainModel.findOneAndUpdate(terrainFilterQuery, terrain, {
      new: true,
    });
  }
  async findOneAndDelete(
    terrainFilterQuery: FilterQuery<Terrain>,
  ): Promise<Terrain> {
    return this.terrainModel.findOneAndDelete(terrainFilterQuery);
  }
  async count(options) {
    return this.terrainModel.count(options).exec();
  }
}
