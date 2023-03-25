import { Route } from '../../domain/Route/route';
import { Repo } from '../../core/infra/Repo';
import { RouteId } from '../../domain/Route/routeId';

export default interface IRouteRepo extends Repo<Route> {
  save(route: Route): Promise<Route>;
  findByRouteId(routeId: RouteId | string): Promise<Route>;
  findAllRoutes(): Promise<Route[]>;
  update(route: Route): Promise<Route>;
  delete(routeId: RouteId | string): void;
}
