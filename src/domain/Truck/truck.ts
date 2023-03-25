import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';
import ITruckDTO from '../../dto/Truck/ITruckDTO';
import { TruckBatteryCapacity } from './truckBatteryCapacity';
import { TruckElectricRange } from './truckElectricRange';
import { TruckId } from './truckId';
import { TruckMaxBattery } from './truckMaxBatteryCapacity';
import { TruckRegistration } from './truckRegistration';
import { TruckChargeTime } from './truckChargeTime';
import { TruckTareWeight } from './truckTareWeight';

interface TruckProps {
  truckId: TruckId;
  registration: TruckRegistration;
  batteryCap: TruckBatteryCapacity;
  maxBatteryCap: TruckMaxBattery;
  electricRange: TruckElectricRange;
  chargeTime: TruckChargeTime;
  tareWeight: TruckTareWeight;
  isActive: string;
}

export class Truck extends AggregateRoot<TruckProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get truckId(): TruckId {
    return this.props.truckId;
  }

  get registration(): TruckRegistration {
    return this.props.registration;
  }

  get batteryCap(): TruckBatteryCapacity {
    return this.props.batteryCap;
  }

  get maxBatteryCap(): TruckMaxBattery {
    return this.props.maxBatteryCap;
  }

  get electricRange(): TruckElectricRange {
    return this.props.electricRange;
  }

  get chargeTime(): TruckChargeTime {
    return this.props.chargeTime;
  }

  get tareWeight(): TruckTareWeight {
    return this.props.tareWeight;
  }

  get isActive() : string {
    return this.props.isActive;
  }

  set isActive(value : string){
    this.props.isActive = value;
  }

  set truckId(value: TruckId) {
    this.props.truckId = value;
  }

  private constructor(props: TruckProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(truckDTO: ITruckDTO, id?: UniqueEntityID): Result<Truck> {
    const truckId = truckDTO.truckId;
    const registration = truckDTO.registration;
    const batteryCap = truckDTO.batteryCap;
    const electricRange = truckDTO.electricRange;
    const maxBatteryCap = truckDTO.maxBatteryCap;
    const chargeTime = truckDTO.chargeTime;
    const tareWeight = truckDTO.tareWeight;
    const isActive = truckDTO.isActive;


    if (truckId === undefined || truckId.length === 0) {
      return Result.fail<Truck>('Truck ID is required!');
    } else if (registration === undefined || registration.length === 0) {
      return Result.fail<Truck>('Registration is required!');
    } else if (batteryCap === undefined || batteryCap.length === 0) {
      return Result.fail<Truck>('BatteryCap is required!');
    } else if (electricRange === undefined || electricRange.length === 0) {
      return Result.fail<Truck>('ElectricRange is required!');
    } else if (maxBatteryCap === undefined || maxBatteryCap.length === 0) {
      return Result.fail<Truck>('MaxBatteryCap is required!');
    } else if (chargeTime === undefined || chargeTime.length === 0) {
      return Result.fail<Truck>('ChargeTime is required!');
    } else if (tareWeight === undefined || tareWeight.length === 0) {
      return Result.fail<Truck>('TareWeight is required!');
    } else {
      const truck = new Truck(
        {
          truckId: TruckId.create(truckId).getValue(),
          registration: TruckRegistration.create({ registration }).getValue(),
          batteryCap: TruckBatteryCapacity.create({ batteryCap }).getValue(),
          electricRange: TruckElectricRange.create({ electricRange }).getValue(),
          maxBatteryCap: TruckMaxBattery.create({ maxBatteryCap }).getValue(),
          chargeTime: TruckChargeTime.create({ chargeTime }).getValue(),
          tareWeight: TruckTareWeight.create({ tareWeight }).getValue(),
          isActive: isActive,
        },
        id,
      );
      return Result.ok<Truck>(truck);
    }
  }

}
