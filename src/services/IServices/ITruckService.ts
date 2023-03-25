import { Result } from '../../core/logic/Result';
import ITruckDTO from '../../dto/Truck/ITruckDTO';

export default interface ITruckService {
  createTruck(truckId: string, truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
  getTruckById(truckId: string): Promise<Result<ITruckDTO>>;
  getAllTrucks(): Promise<Result<ITruckDTO[]>>;
  updateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
  deleteTruck(truckId: string): Promise<Result<boolean>>;
  inactivateAsync(truckId: string): Promise<Result<ITruckDTO>>;
  activateAsync(truckId: string): Promise<Result<ITruckDTO>>;
  checkActivateAsync(truckId: string): Promise<Result<boolean>>;
}
