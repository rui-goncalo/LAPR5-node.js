import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface TareWeightProps {
  tareWeight: string;
}

export class TruckTareWeight extends ValueObject<TareWeightProps> {
  get tareWeight(): string {
    return this.props.tareWeight;
  }

  public constructor(props: TareWeightProps) {
    super(props);
  }

  public static create(props: TareWeightProps): Result<TruckTareWeight> {
    const regex = new RegExp(/([1-9]?[0-9])(,|.)([0-9]{3})/);

    if (regex.test(props.tareWeight)) {
      return Result.ok<TruckTareWeight>(
        new TruckTareWeight({
          tareWeight: props.tareWeight,
        }),
      );
    }
    return Result.fail<TruckTareWeight>('Tare weight is not valid!');
  }
}
