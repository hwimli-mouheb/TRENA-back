/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, Request } from '@nestjs/common';
import { UpdateTerrainDto } from './dto/update-terrain.dto';
import { CreateTerrainDto } from './dto/create-terrain.dto';
import { Terrain } from './schemas/terrain.schema';
import { TerrainRepository } from './terrain.repository';
import { v4 as uuidv4 } from 'uuid';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { User } from 'src/users/schemas/users.schema';

@Injectable()
export class TerrainsService {
  constructor(private readonly terrainRepository: TerrainRepository) {}

  async getTerrainById(terrainId: string): Promise<Terrain> {
    return this.terrainRepository.findOne({ id: terrainId });
  }

  async getTerrains(): Promise<Terrain[]> {
   
    return this.terrainRepository.find({});
  }

  async createTerrain(
    user: User,
    createTerrainDto: CreateTerrainDto,
  ): Promise<Terrain | any> {
    if (user?.role === UserRoleEnum.ADMIN)
      return this.terrainRepository.create({
        id: uuidv4(),
        ...createTerrainDto,
      });
    return new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  async updateTerrain(
    user: User,
    terrainId: string,
    terrainUpdates: UpdateTerrainDto,
  ): Promise<Terrain | any> {
    if (user?.role === UserRoleEnum.ADMIN)
      return this.terrainRepository.findOneAndUpdate(
        { terrainId },
        terrainUpdates,
      );
    return new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
  async deleteTerrain(user: User, terrainId: string): Promise<Terrain | any> {
    if (user?.role === UserRoleEnum.ADMIN)
      return this.terrainRepository.findOneAndDelete({ terrainId });
    return new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
  async count(options) {
    return this.terrainRepository.count(options);
  }
}
