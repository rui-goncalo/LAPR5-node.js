import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface routeProps {
  destination: string;
}

export class RouteDestination extends ValueObject<routeProps> {
  get destination(): string {
    return this.props.destination;
  }

  set destination(value: string) {
    this.destination = value;
  }

  public constructor(props: routeProps) {
    super(props);
  }

  public static create(props: routeProps): Result<RouteDestination> {
    return Result.ok<RouteDestination>(
      new RouteDestination({
        destination: props.destination,
      }),
    );
  }
}
