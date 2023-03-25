import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface TripIdProps {
  value: string;
}

export class TripId extends ValueObject<TripIdProps> {
  get value(): string {
    return this.props.value;
  }

  set value(value: string) {
    this.props.value = value;
  }

  private constructor(props: TripIdProps) {
    super(props);
  }

  public static create(id: string): Result<TripId> {
    const guardResult = Guard.againstNullOrUndefined(id, 'id');

    if (!guardResult.succeeded) {
      return Result.fail<TripId>(guardResult.message);
    } else {
      return Result.ok<TripId>(new TripId({ value: id }));
    }
  }
}
