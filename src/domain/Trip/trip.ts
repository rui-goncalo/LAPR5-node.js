import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { TripId } from './tripId';
import { TripRoutes } from './tripRoutes';
import ITripDTO from '../../dto/Trip/ITripDTO';
import { Result } from '../../core/logic/Result';

interface TripProps {
  tripId: TripId;
  tripRoutes: TripRoutes;
}

export class Trip extends AggregateRoot<TripProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get tripId(): TripId {
    return this.props.tripId;
  }

  get tripRoutes(): TripRoutes {
    return this.props.tripRoutes;
  }

  private constructor(props: TripProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(tripDTO: ITripDTO, id?: UniqueEntityID): Result<Trip> {
    const tripId = tripDTO.tripId;
    const tripRoutes = tripDTO.tripRoutes;

    if (tripId === undefined || tripId.length === 0) {
      return Result.fail<Trip>('TripID is required.');
    } else {
      const trip = new Trip(
        {
          tripId: TripId.create(tripId).getValue(),
          tripRoutes: TripRoutes.create({ value: tripRoutes }).getValue(),
        },
        id,
      );
      return Result.ok<Trip>(trip);
    }
  }
}
