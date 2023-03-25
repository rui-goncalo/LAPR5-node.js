import { Inject, Service } from 'typedi';
import { Document, FilterQuery, Model } from 'mongoose';
import { IRoutePersistence } from '../persistence/dataschema/IRoutePersistence';
import IRouteRepo from './IRepos/IRouteRepo';
import { RouteId } from '../domain/Route/routeId';
import { Route } from '../domain/Route/route';
import { RouteMap } from '../mappers/RouteMap';

@Service()
export default class RouteRepo implements IRouteRepo {
  private models: any;

  constructor(@Inject('routeSchema') private routeSchema: Model<IRoutePersistence & Document>) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  // @ts-ignore
  public async exists(routeId: RouteId | string): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-angle-bracket-type-assertion
    const idX = routeId instanceof RouteId ? (<RouteId>routeId).value : routeId;

    const query = { domainId: idX };
    const userDoc = await this.routeSchema.findOne(query);

    return !!userDoc === true;
  }

  public async save(route: Route): Promise<Route> {
    const query = { routeId: route.routeId.value };

    const routeDoc = await this.routeSchema.findOne(query);

    try {
      if (routeDoc === null) {
        const rawRoute: any = RouteMap.toPersistence(route);
        const routeCreated = await this.routeSchema.create(rawRoute);

        return RouteMap.toDomain(routeCreated);
      } else {
        routeDoc.routeId = route.routeId.value;
        routeDoc.origin = route.routeOrigin.origin;
        routeDoc.destination = route.routeDestination.destination;
        routeDoc.distance = route.routeDistance.distance;
        routeDoc.timeDistance = route.routeTimeDistance.timeDistance;
        routeDoc.energySpent = route.routeEnergySpent.energySpent;
        routeDoc.extraTimeBattery = route.routeExtraTimeBattery.extraTimeBattery;

        await routeDoc.save();

        return route;
      }
    } catch (err) {
      throw err;
    }
  }

  async findByRouteId(routeId: RouteId | string): Promise<Route> {
    const query = { routeId: routeId };
    const routeRecord = await this.routeSchema.findOne(query as FilterQuery<IRoutePersistence & Document>);

    if (routeRecord != null) {
      return RouteMap.toDomain(routeRecord);
    } else return null;
  }

  async findAllRoutes(): Promise<Route[]> {
    const routeArray = await this.routeSchema.find();

    return routeArray.map(item => RouteMap.toDomain(item));
  }

  async update(route: Route): Promise<Route> {
    await this.routeSchema.updateOne({ routeId: route.routeId.value }, RouteMap.toDTO(route));
    // verify here if the update was successful, else throw excp
    const updatedRoute = await this.routeSchema.findOne({ routeId: route.routeId.value });

    return RouteMap.toDomain(updatedRoute);
  }

  async delete(routeId: RouteId | string) {
    const query = { routeId: routeId };
    await this.routeSchema.deleteOne(query as FilterQuery<IRoutePersistence & Document>);
  }
}
