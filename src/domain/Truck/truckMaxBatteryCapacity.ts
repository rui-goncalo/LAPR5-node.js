import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface truckMaxBatteryProps {
  maxBatteryCap: string;
}

export class TruckMaxBattery extends ValueObject<truckMaxBatteryProps> {
  get maxBatteryCap(): string {
    return this.props.maxBatteryCap;
  }

  public constructor(props: truckMaxBatteryProps) {
    super(props);
  }

  public static create(props: truckMaxBatteryProps): Result<TruckMaxBattery> {
    //const maxBat = 4000,

    //if (Number(props.value) <= maxBat) {
    return Result.ok<TruckMaxBattery>(
      new TruckMaxBattery({
        maxBatteryCap: props.maxBatteryCap,
      }),
    );
  }
  //return Result.fail<TruckMaxBattery>("Max Battery is not valid!");
}
//}
