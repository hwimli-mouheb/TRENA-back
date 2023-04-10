import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './schemas/reservation.schema';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  async create(
    @Body() createReservationDto: CreateReservationDto,
  ): Promise<Reservation | null> {
    return this.reservationsService.create(createReservationDto);
  }

  @Get()
  async findAll(): Promise<Reservation[] | null> {
    return this.reservationsService.getReservations();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Reservation | null> {
    return this.reservationsService.getReservationById(id);
  }
}
