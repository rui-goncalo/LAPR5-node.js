import { Inject, Service } from 'typedi';
import IRouteController from './IControllers/IRouteController';
import config from '../../config';
import IRouteService from '../services/IServices/IRouteService';
import { NextFunction, Request, Response } from 'express';
import { Result } from '../core/logic/Result';
import IRouteDTO from '../dto/Route/IRouteDTO';

@Service()
export default class RouteController implements IRouteController {
  constructor(@Inject(config.services.route.name) private routeServiceInstance: IRouteService) {}

  public async createRoute(req: Request, res: Response, next: NextFunction) {
    try {
      const routeOrError = (await this.routeServiceInstance.createRoute(
        req.params.routeId as string,
        req.body as IRouteDTO,
      )) as Result<IRouteDTO>;
      if (routeOrError.isFailure) {
        return res.status(402).send();
      }

      const routeDTO = routeOrError.getValue();
      return res.json(routeDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async getRouteById(req: Request, res: Response, next: NextFunction) {
    try {
      const routes = await this.routeServiceInstance.getRouteById(req.params.routeId as string);
      let route = JSON.parse(JSON.stringify(routes))._value;
      //console.log('AQUI' + JSON.stringify(route));
      const originId = route.origin;
      //console.log(JSON.stringify(originId));
      const destinationId = route.destination;

      const originWarehouse = await this.routeServiceInstance.getWarehouseById(originId);
      const destinationWarehouse = await this.routeServiceInstance.getWarehouseById(destinationId);

      // data is a mandatory field that allow us to returns the object's value
      route.origin = JSON.parse(JSON.stringify(originWarehouse));
      route.destination = JSON.parse(JSON.stringify(destinationWarehouse));

      Object.preventExtensions(route);

      if (routes.isFailure) {
        return res.status(402).send();
      }

      //const routeDTO = routes.getValue();

      return res.json(route).status(200);
      //return res.json(routeDTO).status(200);
    } catch (e) {
      return next(e);
    }
  }

  async getAllRoutes(req: Request, res: Response, next: NextFunction) {
    try {
      const routes = await this.routeServiceInstance.getAllRoutes();

      if (routes.isFailure) {
        return res.status(402).send();
      }

      const routeDTO = routes.getValue();
      return res.json(routeDTO).status(200);
    } catch (e) {
      return next(e);
    }
  }

  async updateRoute(req: Request, res: Response, next: NextFunction) {
    try {
      const routeOrError = (await this.routeServiceInstance.updateRoute(req.body as IRouteDTO)) as Result<IRouteDTO>;

      if (routeOrError.isFailure) {
        return res.status(404).send();
      }

      const routeDTO = routeOrError.getValue();
      return res.status(200).json(routeDTO);
    } catch (e) {
      return next(e);
    }
  }

  async deleteRouteById({ params: { routeId } }: Request, res: Response, next: NextFunction) {
    try {
      const deletedResult = await this.routeServiceInstance.deleteRoute(routeId as string);

      if (deletedResult.isFailure) {
        return res.status(404).send();
      }

      return res.status(200).json({ routeId });
    } catch (e) {
      return next(e);
    }
  }
}
