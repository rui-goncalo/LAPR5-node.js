import { Inject, Service } from 'typedi';
import ITripService from './IServices/ITripService';
import config from '../../config';
import { Result } from '../core/logic/Result';
import ITripRepo from '../repos/IRepos/ITripRepo';
import ITripDTO from '../dto/Trip/ITripDTO';
import { Trip } from '../domain/Trip/trip';
import { TripMap } from '../mappers/TripMap';

@Service()
export default class TripService implements ITripService {
  constructor(@Inject(config.repos.trip.name) private tripRepo: ITripRepo) {}

  async createTrip(tripId: string, tripDTO: ITripDTO): Promise<Result<ITripDTO>> {
    try {
      const trip = await this.tripRepo.findByTripId(tripDTO.tripId);

      if (trip != null) {
        return Result.fail<ITripDTO>('Trip already exists: ' + tripDTO.tripId);
      }
    } catch (e) {}

    try {
      const tripOrError = await Trip.create(tripDTO);

      if (tripOrError.isFailure) {
        return Result.fail<ITripDTO>(tripOrError.errorValue());
      }
      const tripRes = tripOrError.getValue();

      await this.tripRepo.save(tripRes);

      const tripDTORes = TripMap.toDTO(tripRes) as ITripDTO;
      return Result.ok<ITripDTO>(tripDTORes);
    } catch (e) {
      throw e;
    }
  }

  async getTripById(tripId: string): Promise<Result<ITripDTO>> {
    try {
      let getTrip = await this.tripRepo.findByTripId(tripId);

      if (getTrip == null) {
        return Result.fail('No trip ID available.');
      }

      const tripDTOResult = TripMap.toDTO(getTrip) as ITripDTO;
      return Result.ok<ITripDTO>(tripDTOResult);
    } catch (e) {
      throw e;
    }
  }

  async getAllTrips(): Promise<Result<ITripDTO[]>> {
    try {
      let trips = await this.tripRepo.findAllTrips();

      if (trips == null) {
        return Result.fail('No trips available.');
      }
      const tripDTORes = trips.map(item => TripMap.toDTO(item));

      return Result.ok<ITripDTO[]>(tripDTORes);
    } catch (e) {
      throw e;
    }
  }

  async updateTrip(tripDTO: ITripDTO): Promise<Result<ITripDTO>> {
    try {
      const exists = await this.tripRepo.findByTripId(tripDTO.tripId);

      if (!exists) {
        return Result.fail<ITripDTO>('Trip not found.');
      }

      const updatedTrip = await this.tripRepo.update(TripMap.toDomain(tripDTO));
      const tripDTOResult = TripMap.toDTO(updatedTrip) as ITripDTO;
      return Result.ok<ITripDTO>(tripDTOResult);
    } catch (e) {
      throw e;
    }
  }

  async deleteTrip(tripId: string): Promise<Result<boolean>> {
    try {
      const exists = await this.tripRepo.findByTripId(tripId);

      if (!exists) {
        return Result.fail(false);
      }

      await this.tripRepo.delete(tripId);
      return Result.ok(true);
    } catch (e) {
      throw e;
    }
  }
}
