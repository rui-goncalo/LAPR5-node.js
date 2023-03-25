import { DeliveryPlan } from '../domain/DeliveryPlan/deliveryPlan';
import { Mapper } from '../core/infra/Mapper';
import { DeliveryPlanId } from '../domain/DeliveryPlan/deliveryPlanId';
import IDeliveryPlanDTO from '../dto/DeliveryPlan/IDeliveryPlanDTO';
import { Document, Model } from 'mongoose';
import { IDeliveryPlanPersistence } from '../persistence/dataschema/IDeliveryPlanPersistence';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class DeliveryPlanMap extends Mapper<DeliveryPlan> {
  public static toDTO(deliveryPlan: DeliveryPlan): IDeliveryPlanDTO {
    return {
      deliveryPlanId: deliveryPlan.deliveryPlanId.value,
      deliveryPlanDeliveries: deliveryPlan.deliveryPlanDeliveries.value,
    } as IDeliveryPlanDTO;
  }

  public static toDomain(deliveryPlan: any | Model<IDeliveryPlanPersistence & Document>): DeliveryPlan {
    const deliveryPlanOrError = DeliveryPlan.create(deliveryPlan, new UniqueEntityID(deliveryPlan.deliveryPlanId));

    deliveryPlanOrError.isFailure ? console.log(deliveryPlanOrError.error) : '';

    return deliveryPlanOrError.isSuccess ? deliveryPlanOrError.getValue() : null;
  }

  public static toPersistence(deliveryPlan: DeliveryPlan): any {
    const dp = {
      deliveryPlanId: deliveryPlan.deliveryPlanId.value.toString(),
      deliveries: deliveryPlan.deliveryPlanDeliveries.value,
    };
    return dp;
  }
}
