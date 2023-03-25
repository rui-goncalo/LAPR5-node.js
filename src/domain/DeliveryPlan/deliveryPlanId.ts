import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';

interface DeliveryPlanProps {
  value: string;
}

export class DeliveryPlanId extends ValueObject<DeliveryPlanProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: DeliveryPlanProps) {
    super(props);
  }

  public static create(id: string): Result<DeliveryPlanId> {
    const guardResult = Guard.againstNullOrUndefined(id, 'id');

    if (!guardResult.succeeded) {
      return Result.fail<DeliveryPlanId>(guardResult.message);
    } else {
      return Result.ok<DeliveryPlanId>(new DeliveryPlanId({ value: id }));
    }
  }
}
