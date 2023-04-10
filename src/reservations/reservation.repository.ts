/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class ReservationRepository {
  constructor(
    @InjectModel(Reservation.name) private ReservationModel: Model<ReservationDocument>,
  ) {}
  async findOne(ReservationFilterQuery: FilterQuery<Reservation>): Promise<Reservation> {
    return this.ReservationModel.findOne(ReservationFilterQuery);
  }

  async find(ReservationFilterQuery: FilterQuery<Reservation>): Promise<Reservation[]> {
    return this.ReservationModel.find(ReservationFilterQuery);
  }

  async create(Reservation: Reservation): Promise<Reservation> {
    const newReservation = new this.ReservationModel(Reservation);
    return newReservation.save();
  }

  async findOneAndUpdate(
    ReservationFilterQuery: FilterQuery<Reservation>,
    Reservation: Partial<Reservation>,
  ): Promise<Reservation> {
    return this.ReservationModel.findOneAndUpdate(ReservationFilterQuery, Reservation, {
      new: true,
    });
  }
  async findOneAndDelete(ReservationFilterQuery: FilterQuery<Reservation>): Promise<Reservation> {
    return this.ReservationModel.findOneAndDelete(ReservationFilterQuery);
  }
  async count(options) {
    return this.ReservationModel.count(options).exec();
  }
}
