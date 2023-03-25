import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface routeEnergySpentProps {
  energySpent: string;
}

export class RouteEnergySpent extends ValueObject<routeEnergySpentProps> {
  get energySpent(): string {
    return this.props.energySpent;
  }

  set energySpent(value: string) {
    this.energySpent = value;
  }

  public constructor(props: routeEnergySpentProps) {
    super(props);
  }

  public static create(props: routeEnergySpentProps): Result<RouteEnergySpent> {
    const regex = new RegExp(/([0].[1-9])|([1-9][0-9]*)/);

    if (regex.test(props.energySpent)) {
      return Result.ok<RouteEnergySpent>(
        new RouteEnergySpent({
          energySpent: props.energySpent,
        }),
      );
    }
    return Result.fail<RouteEnergySpent>('Energy spent is not valid!');
  }
}
