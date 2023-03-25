import { CheckPrimeOptions } from 'crypto';
import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface chargeTimeProps {
  chargeTime: string;
}

export class TruckChargeTime extends ValueObject<chargeTimeProps> {
  get chargeTime(): string {
    return this.props.chargeTime;
  }

  public constructor(props: chargeTimeProps) {
    super(props);
  }

  public static create(props: chargeTimeProps): Result<TruckChargeTime> {
    const regex = new RegExp(/^([0-9]?[0-9]):[0-5][0-9]$/);

    if (regex.test(props.chargeTime)) {
      return Result.ok<TruckChargeTime>(
        new TruckChargeTime({
          chargeTime: props.chargeTime,
        }),
      );
    }
    return Result.fail<TruckChargeTime>('Charge time is not valid!');
  }
}
