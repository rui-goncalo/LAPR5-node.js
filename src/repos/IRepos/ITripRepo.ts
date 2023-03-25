import { Trip } from '../../domain/Trip/trip';
import { Repo } from '../../core/infra/Repo';
import { TripId } from '../../domain/Trip/tripId';

export default interface ITripRepo extends Repo<Trip> {
  save(trip: Trip): Promise<Trip>;
  findByTripId(tripId: TripId | string): Promise<Trip>;
  findAllTrips(): Promise<Trip[]>;
  update(trip: Trip): Promise<Trip>;
  delete(tripId: TripId | string): void;
}
