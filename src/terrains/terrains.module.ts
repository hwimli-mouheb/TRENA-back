import { Module } from '@nestjs/common';
import { TerrainsService } from './terrains.service';
import { TerrainsController } from './terrains.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TerrainSchema } from './schemas/terrain.schema';
import { TerrainRepository } from './terrain.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Terrain', schema: TerrainSchema }]),
  ],
  controllers: [TerrainsController],
  providers: [TerrainsService, TerrainRepository],
})
export class TerrainsModule {}
