import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import IRouteDTO from '../../dto/Route/IRouteDTO';

interface TripRoutesProps {
  value: string;
}

export class TripRoutes extends ValueObject<TripRoutesProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: TripRoutesProps) {
    super(props);
  }

  public static create(props: TripRoutesProps): Result<TripRoutes> {
    return Result.ok<TripRoutes>(new TripRoutes({ value: props.value }));
  }
}
