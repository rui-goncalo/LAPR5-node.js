import { Result } from '../../core/logic/Result';
import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';

interface truckIdProps {
  value: string;
}

export class TruckId extends ValueObject<truckIdProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: truckIdProps) {
    super(props);
  }

  public static create(id: string): Result<TruckId> {
    const guardResult = Guard.againstNullOrUndefined(id, 'id');

    if (!guardResult.succeeded) {
      return Result.fail<TruckId>(guardResult.message);
    } else {
      return Result.ok<TruckId>(new TruckId({ value: id }));
    }
  }
}
