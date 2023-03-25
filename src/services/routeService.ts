import { Inject, Service } from 'typedi';
import IRouteService from './IServices/IRouteService';
import config from '../../config';
import IRouteRepo from '../repos/IRepos/IRouteRepo';
import IRouteDTO from '../dto/Route/IRouteDTO';
import { Result } from '../core/logic/Result';
import { Route } from '../domain/Route/route';
import { RouteMap } from '../mappers/RouteMap';
import * as https from 'https';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios');

@Service()
export default class RouteService implements IRouteService {
  constructor(@Inject(config.repos.route.name) private routeRepo: IRouteRepo) {}

  async createRoute(routeId: string, routeDTO: IRouteDTO): Promise<Result<IRouteDTO>> {
    try {
      const route = await this.routeRepo.findByRouteId(routeDTO.routeId);

      if (route != null) {
        return Result.fail<IRouteDTO>('Route already exists: ' + routeDTO.routeId);
      }

      const routeOrError = await Route.create(routeDTO);

      if (routeOrError.isFailure) {
        return Result.fail<IRouteDTO>(routeOrError.errorValue());
      }
      const routeResult = routeOrError.getValue();

      await this.routeRepo.save(routeResult);

      const routeDTOResult = RouteMap.toDTO(routeResult) as IRouteDTO;
      return Result.ok<IRouteDTO>(routeDTOResult);
    } catch (e) {
      throw e;
    }
  }

  async getRouteById(routeId: string): Promise<Result<IRouteDTO>> {
    try {
      let getRoute = await this.routeRepo.findByRouteId(routeId);

      if (getRoute == null) {
        return Result.fail('No route ID available.');
      }
      const routeDTOResult = RouteMap.toDTO(getRoute) as IRouteDTO;
      return Result.ok<IRouteDTO>(routeDTOResult);
    } catch (e) {
      throw e;
    }
  }

  async getAllRoutes(): Promise<Result<IRouteDTO[]>> {
    try {
      let routes = await this.routeRepo.findAllRoutes();

      if (routes == null) {
        return Result.fail('No routes available.');
      }
      const routeDTORes = routes.map(item => RouteMap.toDTO(item));

      return Result.ok<IRouteDTO[]>(routeDTORes);
    } catch (e) {
      throw e;
    }
  }

  async updateRoute(routeDTO: IRouteDTO): Promise<Result<IRouteDTO>> {
    try {
      const exists = await this.routeRepo.findByRouteId(routeDTO.routeId);

      if (!exists) {
        return Result.fail<IRouteDTO>('Route not found.');
      }

      const updatedRoute = await this.routeRepo.update(RouteMap.toDomain(routeDTO));
      const routeDTOResult = RouteMap.toDTO(updatedRoute) as IRouteDTO;
      return Result.ok<IRouteDTO>(routeDTOResult);
    } catch (e) {
      throw e;
    }
  }

  async deleteRoute(routeId: string): Promise<Result<boolean>> {
    try {
      const exists = await this.routeRepo.findByRouteId(routeId);

      if (!exists) {
        return Result.fail(false);
      }

      await this.routeRepo.delete(routeId);
      return Result.ok(true);
    } catch (e) {
      throw e;
    }
  }

  //async getWarehouseById(warehouseId: string): Promise<Result<IWarehouseDTO>>
  async getWarehouseById(warehouseId: string): Promise<Result<any>> {
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });

    instance.get('http://localhost:5000/api/Warehouses/ByIdentifier/' + warehouseId);
    // At request level
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });

    const getWarehouseIdData = axios.get('http://localhost:5000/api/Warehouses/ByIdentifier/' + warehouseId, { httpsAgent: agent });

    const dataWarehouse = getWarehouseIdData.then((response) => response.data)

    return dataWarehouse;
  }
}
