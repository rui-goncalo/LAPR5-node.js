import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface routeProps {
  origin: string;
}

export class RouteOrigin extends ValueObject<routeProps> {
  get origin(): string {
    return this.props.origin;
  }

  set origin(value: string) {
    this.origin = value;
  }

  public constructor(props: routeProps) {
    super(props);
  }

  public static create(props: routeProps): Result<RouteOrigin> {
    return Result.ok<RouteOrigin>(
      new RouteOrigin({
        origin: props.origin,
      }),
    );
  }
}
