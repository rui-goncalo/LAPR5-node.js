import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface routeExtraTimeBatteryProps {
  extraTimeBattery: string;
}

export class RouteExtraTimeBattery extends ValueObject<routeExtraTimeBatteryProps> {
  get extraTimeBattery(): string {
    return this.props.extraTimeBattery;
  }

  set extraTimeBattery(value: string) {
    this.extraTimeBattery = value;
  }

  public constructor(props: routeExtraTimeBatteryProps) {
    super(props);
  }

  public static create(props: routeExtraTimeBatteryProps): Result<RouteExtraTimeBattery> {
    const regex = new RegExp(/^([0-9]?[0-9]{2}):[0-5][0-9]$/);

    if (regex.test(props.extraTimeBattery)) {
      return Result.ok<RouteExtraTimeBattery>(
        new RouteExtraTimeBattery({
          extraTimeBattery: props.extraTimeBattery,
        }),
      );
    }
    return Result.fail<RouteExtraTimeBattery>('Extra time battery is not valid!');
  }
}
