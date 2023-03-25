import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface electricRangeProps {
  electricRange: string;
}

export class TruckElectricRange extends ValueObject<electricRangeProps> {
  get electricRange(): string {
    return this.props.electricRange;
  }

  public constructor(props: electricRangeProps) {
    super(props);
  }

  public static create(props: electricRangeProps): Result<TruckElectricRange> {
    return Result.ok<TruckElectricRange>(
      new TruckElectricRange({
        electricRange: props.electricRange,
      }),
    );
  }
}
