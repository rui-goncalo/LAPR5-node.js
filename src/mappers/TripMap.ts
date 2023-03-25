import { Mapper } from '../core/infra/Mapper';
import { Trip } from '../domain/Trip/trip';
import ITripDTO from '../dto/Trip/ITripDTO';
import { Document, Model } from 'mongoose';
import { ITripPersistence } from '../persistence/dataschema/ITripPersistence';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class TripMap extends Mapper<Trip> {
  public static toDTO(trip: Trip): ITripDTO {
    return {
      tripId: trip.tripId.value,
      tripRoutes: trip.tripRoutes.value,
    } as ITripDTO;
  }

  public static toDomain(trip: any | Model<ITripPersistence & Document>): Trip {
    const tripOrError = Trip.create(trip, new UniqueEntityID(trip.domainId));

    tripOrError.isFailure ? console.log(tripOrError.error) : '';

    return tripOrError.isSuccess ? tripOrError.getValue() : null;
  }

  public static toPersistence(trip: Trip): any {
    const res = {
      tripId: trip.tripId.value,
      tripRoutes: trip.tripRoutes.value,
    };
    return res;
  }
}
