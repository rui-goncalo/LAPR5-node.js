import { Inject, Service } from 'typedi';
import ITripRepo from './IRepos/ITripRepo';
import { Document, FilterQuery, Model } from 'mongoose';
import { ITripPersistence } from '../persistence/dataschema/ITripPersistence';
import { TripId } from '../domain/Trip/tripId';
import { Trip } from '../domain/Trip/trip';
import { TripMap } from '../mappers/TripMap';
import { RouteMap } from '../mappers/RouteMap';
import config from '../../config';
import IRouteRepo from './IRepos/IRouteRepo';

@Service()
export default class TripRepo implements ITripRepo {
  private models: any;

  constructor(
    @Inject('tripSchema') private tripSchema: Model<ITripPersistence & Document>,
    @Inject(config.repos.route.name) private routeRepo: IRouteRepo,
  ) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  // @ts-ignore
  public async exists(tripId: TripId | string): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-angle-bracket-type-assertion
    const idX = tripId instanceof TripId ? (<TripId>tripId).value : tripId;

    const query = { domainId: idX };
    const userDoc = await this.tripSchema.findOne(query);

    return !!userDoc === true;
  }

  public async save(trip: Trip): Promise<Trip> {
    const query = { tripId: trip.tripId.value };

    const tripDoc = await this.tripSchema.findOne(query);

    try {
      if (tripDoc === null) {
        const rawTrip: any = TripMap.toPersistence(trip);
        const tripCreated = await this.tripSchema.create(rawTrip);

        return TripMap.toDomain(tripCreated);
      } else {
        tripDoc.tripId = trip.tripId.value;
        // @ts-ignore
        tripDoc.tripRoutes = trip.tripRoutes.value.map(({ routeId }) => routeId);

        await tripDoc.save();

        return trip;
      }
    } catch (err) {
      throw err;
    }
  }

  async findByTripId(tripId: TripId | string): Promise<Trip> {
    const query = { tripId: tripId };
    const tripRecord = await this.tripSchema.findOne(query as FilterQuery<ITripPersistence & Document>);

    // get all routes for the trip
    // @ts-ignore
    const routesDb = await Promise.all(tripRecord.tripRoutes.map(async id => this.routeRepo.findByRouteId(id)));

    const trip = {
      tripId: tripRecord.tripId,
      tripRoutes: routesDb.map(RouteMap.toDTO),
    };

    if (tripRecord != null) {
      return TripMap.toDomain(trip);
    } else return null;
  }

  async findAllTrips(): Promise<Trip[]> {
    const tripArray = await this.tripSchema.find();

    return tripArray.map(item => TripMap.toDomain(item));
  }

  async update(trip: Trip): Promise<Trip> {
    // @ts-ignore
    await this.tripSchema.updateOne({ tripId: trip.tripId.value }, TripMap.toDTO(trip));
    // verify here if the update was successful, else throw excp
    const updatedTrip = await this.tripSchema.findOne({ tripId: trip.tripId.value });

    return TripMap.toDomain(updatedTrip);
  }

  async delete(tripId: TripId | string) {
    const query = { tripId: tripId };
    await this.tripSchema.deleteOne(query as FilterQuery<ITripPersistence & Document>);
  }
}
