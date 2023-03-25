import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface PackagingProps {
  value: string;
}

export class PackagingId extends ValueObject<PackagingProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: PackagingProps) {
    super(props);
  }

  public static create(id: string): Result<PackagingId> {
    const guardResult = Guard.againstNullOrUndefined(id, 'id');

    if (!guardResult.succeeded) {
      return Result.fail<PackagingId>(guardResult.message);
    } else {
      return Result.ok<PackagingId>(new PackagingId({ value: id }));
    }
  }
}
