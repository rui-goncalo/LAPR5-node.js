import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface routeDistanceProps {
  distance: string;
}

export class RouteDistance extends ValueObject<routeDistanceProps> {
  get distance(): string {
    return this.props.distance;
  }

  set distance(value: string) {
    this.distance = value;
  }

  public constructor(props: routeDistanceProps) {
    super(props);
  }

  public static create(props: routeDistanceProps): Result<RouteDistance> {
    const regex = new RegExp(/([1-9][0-9]*)((.|,)([0-9]{2}))?/);

    if (regex.test(props.distance)) {
      return Result.ok<RouteDistance>(
        new RouteDistance({
          distance: props.distance,
        }),
      );
    }
    return Result.fail<RouteDistance>('Distance is not valid!');
  }
}
