import { Mapper } from '../core/infra/Mapper';
import { Document, Model } from 'mongoose';
import { ITruckPersistence } from '../persistence/dataschema/ITruckPersistence';
import ITruckDTO from '../dto/Truck/ITruckDTO';
import { Truck } from '../domain/Truck/truck';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class TruckMap extends Mapper<Truck> {
  public static toDTO(truck: Truck): ITruckDTO {
    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    return {
      truckId: truck.truckId.value,
      registration: truck.registration.registration,
      batteryCap: truck.batteryCap.batteryCap,
      maxBatteryCap: truck.maxBatteryCap.maxBatteryCap,
      electricRange: truck.electricRange.electricRange,
      chargeTime: truck.chargeTime.chargeTime,
      tareWeight: truck.tareWeight.tareWeight,
      isActive: truck.isActive,
    } as ITruckDTO;
  }

  public static toDomain(truck: any | Model<ITruckPersistence & Document>): Truck {
    const truckOrError = Truck.create(truck, new UniqueEntityID(truck.domainId));

    truckOrError.isFailure ? console.log(truckOrError.error) : '';

    return truckOrError.isSuccess ? truckOrError.getValue() : null;
  }

  public static toPersistence(truck: Truck): any {
    const res = {
      truckId: truck.truckId.value,
      registration: truck.registration.registration,
      batteryCap: truck.batteryCap.batteryCap,
      maxBatteryCap: truck.maxBatteryCap.maxBatteryCap,
      electricRange: truck.electricRange.electricRange,
      chargeTime: truck.chargeTime.chargeTime,
      tareWeight: truck.tareWeight.tareWeight,
      isActive: truck.isActive,
    };
    return res;
  }
}
