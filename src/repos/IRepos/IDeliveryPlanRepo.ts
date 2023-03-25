import { DeliveryPlan } from '../../domain/DeliveryPlan/deliveryPlan';
import { DeliveryPlanDeliveries } from '../../domain/DeliveryPlan/deliveryPlanDeliveries';
import { Repo } from '../../core/infra/Repo';
import { Result } from '../../core/logic/Result';
import IDeliveryPlanDTO from '../../dto/DeliveryPlan/IDeliveryPlanDTO';
import { Trip } from '../../domain/Trip/trip';
import { TripId } from '../../domain/Trip/tripId';

export default interface IDeliveryPlanRepo extends Repo<DeliveryPlan> {
  save(deliveyPlan: DeliveryPlan): Promise<DeliveryPlan>;
  findByDeliveryPlanId(deliveryPlanId: string): Promise<DeliveryPlan>;
  getAllDeliveryPlans(): Promise<DeliveryPlan[]>;
  update(deliveryPlan: DeliveryPlan): Promise<DeliveryPlan>;
  delete(deliveryPlan: DeliveryPlan | string): void;
}
