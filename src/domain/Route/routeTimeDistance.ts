import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface routeTimeDistanceProps {
  timeDistance: string;
}

export class RouteTimeDistance extends ValueObject<routeTimeDistanceProps> {
  get timeDistance(): string {
    return this.props.timeDistance;
  }

  set timeDistance(value: string) {
    this.timeDistance = value;
  }

  public constructor(props: routeTimeDistanceProps) {
    super(props);
  }

  public static create(props: routeTimeDistanceProps): Result<RouteTimeDistance> {
    const regex = new RegExp(/^([0-9]?[0-9]):[0-5][0-9]$/);

    if (regex.test(props.timeDistance)) {
      return Result.ok<RouteTimeDistance>(
        new RouteTimeDistance({
          timeDistance: props.timeDistance,
        }),
      );
    }
    return Result.fail<RouteTimeDistance>('Time distance is not valid!');
  }
}
