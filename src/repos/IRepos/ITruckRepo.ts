import { Repo } from '../../core/infra/Repo';
import { Truck } from '../../domain/Truck/truck';
import { TruckId } from '../../domain/Truck/truckId';

export default interface ITruckRepo extends Repo<Truck> {
  save(truck: Truck): Promise<Truck>;
  findAllTrucks(): Promise<Truck[]>;
  findById(truckId: TruckId | string): Promise<Truck>;
  update(truck: Truck): Promise<Truck>;
  delete(truckId: TruckId | string): void;
}
