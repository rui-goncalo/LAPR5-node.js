import IRouteDTO from '../../dto/Route/IRouteDTO';
import { Result } from '../../core/logic/Result';
import IWarehouseDTO from '../../dto/Warehouse/IwarehouseDTO';

export default interface IRouteService {
  createRoute(routeId: string, routeDTO: IRouteDTO): Promise<Result<IRouteDTO>>;
  getRouteById(routeId: string): Promise<Result<IRouteDTO>>;
  getAllRoutes(): Promise<Result<IRouteDTO[]>>;
  updateRoute(routeDTO: IRouteDTO): Promise<Result<IRouteDTO>>;
  deleteRoute(routeId: string): Promise<Result<boolean>>;
  getWarehouseById(warehouseId: string): Promise<Result<IWarehouseDTO>>;
}
