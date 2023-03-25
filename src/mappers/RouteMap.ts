import { Mapper } from '../core/infra/Mapper';
import { Route } from '../domain/Route/route';
import IRouteDTO from '../dto/Route/IRouteDTO';
import { Document, Model } from 'mongoose';
import { IRoutePersistence } from '../persistence/dataschema/IRoutePersistence';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class RouteMap extends Mapper<Route> {
  public static toDTO(route: Route): IRouteDTO {
    return {
      routeId: route.routeId.value,
      origin: route.routeOrigin.origin,
      destination: route.routeDestination.destination,
      distance: route.routeDistance.distance,
      timeDistance: route.routeTimeDistance.timeDistance,
      energySpent: route.routeEnergySpent.energySpent,
      extraTimeBattery: route.routeExtraTimeBattery.extraTimeBattery,
    } as IRouteDTO;
  }

  public static toDomain(route: any | Model<IRoutePersistence & Document>): Route {
    const routeOrError = Route.create(route, new UniqueEntityID(route.domainId));

    routeOrError.isFailure ? console.log(routeOrError.error) : '';

    return routeOrError.isSuccess ? routeOrError.getValue() : null;
  }

  public static toPersistence(route: Route): any {
    const res = {
      routeId: route.routeId.value,
      origin: route.routeOrigin.origin,
      destination: route.routeDestination.destination,
      distance: route.routeDistance.distance,
      timeDistance: route.routeTimeDistance.timeDistance,
      energySpent: route.routeEnergySpent.energySpent,
      extraTimeBattery: route.routeExtraTimeBattery.extraTimeBattery,
    };
    return res;
  }
}
