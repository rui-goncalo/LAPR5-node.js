import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface DeliveryPlanDeliveriesProps {
  value: string[];
}

export class DeliveryPlanDeliveries extends ValueObject<DeliveryPlanDeliveriesProps> {
  get value(): string[] {
    return this.props.value;
  }

  private constructor(props: DeliveryPlanDeliveriesProps) {
    super(props);
  }

  public static create(props: DeliveryPlanDeliveriesProps): Result<DeliveryPlanDeliveries> {
    return Result.ok<DeliveryPlanDeliveries>(
      new DeliveryPlanDeliveries({
        value: props.value,
      }),
    );
  }
}
