import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservation.repository';
import { v4 as uuidv4 } from 'uuid';
import { Reservation } from './schemas/reservation.schema';
import { HttpException } from '@nestjs/common/exceptions';
import { json } from 'stream/consumers';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation | any> {
    const { user, terrain, date_d, date_f, status } = createReservationDto;
    let timeConflictTest = false;
    //month/day/year of the input reservation
    const date = new Date(date_d).toLocaleDateString();
    // beginning time of the input reservation
    const timeD =
      new Date(date_d).getHours() - 1 + new Date(date_d).getMinutes() / 100;
    // ending time of the input reservation
    const timeF =
      new Date(date_f).getHours() - 1 + new Date(date_f).getMinutes() / 100;
    if (timeF > timeD) {
      const terrainRes = this.getReservationByTerrainId(terrain);
      if (terrainRes) {
        //check compatibility with date
        (await terrainRes).forEach((elt) => {
          //month/day/year of the reservation already there
          const eltDate = new Date(elt.date_d).toLocaleDateString();
          if (eltDate === date) {
            //check compatibility with time intervalls
            const eltTimeD =
              new Date(elt.date_d).getHours() -
              1 +
              new Date(elt.date_d).getMinutes() / 100;
            const eltTimeF =
              new Date(elt.date_f).getHours() -
              1 +
              new Date(elt.date_f).getMinutes() / 100;
            if (eltTimeD <= timeD && timeD < eltTimeF) {
              timeConflictTest = true;
            } else if (timeD < eltTimeD && timeF > eltTimeD) {
              timeConflictTest = true;
            }
          }
        });
      }
      if (timeConflictTest === false) {
        return this.reservationRepository.create({
          id: uuidv4(),
          ...createReservationDto,
        });
      } else return { res: 'error', message: 'Horaire indisponibles' };
    } else
      return { res: 'error', message: 'Veuillez vérifier les dates entrées' };
  }

  async getReservations(): Promise<Reservation[] | null> {
    return this.reservationRepository.find({});
  }

  async getReservationById(reservationId: string): Promise<Reservation> {
    return this.reservationRepository.findOne({ id: reservationId });
  }
  async getReservationByTerrainId(terrainId: string): Promise<Reservation[]> {
    return this.reservationRepository.find({ terrain: terrainId });
  }
  async getReservationByUserId(userId: string): Promise<Reservation[]> {
    return this.reservationRepository.find({ user: userId });
  }
}
