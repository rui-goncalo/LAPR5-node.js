import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';

interface RouteIdProps {
  value: string;
}

export class RouteId extends ValueObject<RouteIdProps> {
  get value(): string {
    return this.props.value;
  }

  set value(value: string) {
    this.props.value = value;
  }

  private constructor(props: RouteIdProps) {
    super(props);
  }

  public static create(id: string): Result<RouteId> {
    const guardResult = Guard.againstNullOrUndefined(id, 'id');

    if (!guardResult.succeeded) {
      return Result.fail<RouteId>(guardResult.message);
    } else {
      return Result.ok<RouteId>(new RouteId({ value: id }));
    }
  }
}
