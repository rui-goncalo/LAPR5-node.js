import { Aggregate } from 'mongoose';
import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';
import IRouteDTO from '../../dto/Route/IRouteDTO';
import { RouteDestination } from './routeDestination';
import { RouteDistance } from './routeDistance';
import { RouteEnergySpent } from './routeEnergySpent';
import { RouteExtraTimeBattery } from './routeExtraTimeBattery';
import { RouteId } from './routeId';
import { RouteOrigin } from './routeOrigin';
import { RouteTimeDistance } from './routeTimeDistance';

interface RouteProps {
  routeId: RouteId;
  origin: RouteOrigin;
  destination: RouteDestination;
  distance: RouteDistance;
  timeDistance: RouteTimeDistance;
  energySpent: RouteEnergySpent;
  extraTimeBattery: RouteExtraTimeBattery;
}

export class Route extends AggregateRoot<RouteProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get routeId(): RouteId {
    return this.props.routeId;
  }

  get routeOrigin(): RouteOrigin {
    return this.props.origin;
  }

  get routeDestination(): RouteDestination {
    return this.props.destination;
  }

  get routeDistance(): RouteDistance {
    return this.props.distance;
  }

  get routeTimeDistance(): RouteTimeDistance {
    return this.props.timeDistance;
  }

  get routeEnergySpent(): RouteEnergySpent {
    return this.props.energySpent;
  }

  get routeExtraTimeBattery(): RouteExtraTimeBattery {
    return this.props.extraTimeBattery;
  }

  set routeId(value: RouteId) {
    this.props.routeId = value;
  }

  set routeOrigin(value: RouteOrigin) {
    this.props.origin = value;
  }

  set routeDestination(value: RouteDestination) {
    this.props.destination = value;
  }

  set routeDistance(value: RouteDistance) {
    this.props.distance = value;
  }

  set routeEnergySpent(value: RouteEnergySpent) {
    this.props.energySpent = value;
  }

  set routeExtraTimeBattery(value: RouteExtraTimeBattery) {
    this.props.extraTimeBattery = value;
  }

  private constructor(props: RouteProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(routeDTO: IRouteDTO, id?: UniqueEntityID): Result<Route> {
    const routeId = routeDTO.routeId;
    const origin = routeDTO.origin;
    const destination = routeDTO.destination;
    const distance = routeDTO.distance;
    const timeDistance = routeDTO.timeDistance;
    const energySpent = routeDTO.energySpent;
    const extraTimeBattery = routeDTO.extraTimeBattery;

    if (routeId === undefined || routeId.length === 0) {
      return Result.fail<Route>('RouteId is required.');
    } else if (origin === undefined || origin.length === 0) {
      return Result.fail<Route>('Origin is required.');
    } else if (destination === undefined || destination.length === 0) {
      return Result.fail<Route>('Destination is required.');
    } else if (distance === undefined || distance.length === 0) {
      return Result.fail<Route>('Distance is required.');
    } else if (timeDistance === undefined || timeDistance.length === 0) {
      return Result.fail<Route>('TimeDistance is required.');
    } else if (energySpent === undefined || energySpent.length === 0) {
      return Result.fail<Route>('EnergySpent is required.');
    } else if (extraTimeBattery === undefined || extraTimeBattery.length === 0) {
      return Result.fail<Route>('ExtraTimeBattery is required.');
    } else {
      const route = new Route(
        {
          routeId: RouteId.create(routeId).getValue(),
          origin: RouteOrigin.create({ origin }).getValue(),
          destination: RouteDestination.create({ destination }).getValue(),
          distance: RouteDistance.create({ distance }).getValue(),
          timeDistance: RouteTimeDistance.create({ timeDistance }).getValue(),
          energySpent: RouteEnergySpent.create({ energySpent }).getValue(),
          extraTimeBattery: RouteExtraTimeBattery.create({ extraTimeBattery }).getValue(),
        },
        id,
      );
      return Result.ok<Route>(route);
    }
  }
}
