import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';
import IDeliveryPlanDTO from '../../dto/DeliveryPlan/IDeliveryPlanDTO';
import { DeliveryPlanId } from './deliveryPlanId';
import { DeliveryPlanDeliveries } from './deliveryPlanDeliveries';

interface DeliveryPlanProps {
  deliveryPlanId: DeliveryPlanId;
  deliveryPlanDeliveries: DeliveryPlanDeliveries;
}

export class DeliveryPlan extends AggregateRoot<DeliveryPlanProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get deliveryPlanId(): DeliveryPlanId {
    return this.props.deliveryPlanId;
  }

  get deliveryPlanDeliveries(): DeliveryPlanDeliveries {
    return this.props.deliveryPlanDeliveries;
  }

  set deliveryPlanId(value: DeliveryPlanId) {
    this.props.deliveryPlanId = value;
  }

  set deliveryPlanDeliveries(value: DeliveryPlanDeliveries) {
    this.props.deliveryPlanDeliveries = value;
  }

  private constructor(props: DeliveryPlanProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(deliveryPlanDTO: IDeliveryPlanDTO, id?: UniqueEntityID): Result<DeliveryPlan> {
    const deliveryPlanId = deliveryPlanDTO.deliveryPlanId;
    const deliveryPlanDeliveries = deliveryPlanDTO.deliveryPlanDeliveries;

    if (deliveryPlanId === undefined || deliveryPlanId.length === 0) {
      return Result.fail<DeliveryPlan>('DeliveryPlanID is required.');
    } else {
      const deliveryPlan = new DeliveryPlan(
        {
          deliveryPlanId: DeliveryPlanId.create(deliveryPlanId).getValue(),
          deliveryPlanDeliveries: DeliveryPlanDeliveries.create({ value: deliveryPlanDeliveries }).getValue(),
        },
        id,
      );
      return Result.ok<DeliveryPlan>(deliveryPlan);
    }
  }
}
