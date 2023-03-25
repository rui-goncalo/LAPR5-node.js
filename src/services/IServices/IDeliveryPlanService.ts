import IDeliveryPlanDTO from '../../dto/DeliveryPlan/IDeliveryPlanDTO';
import { Result } from '../../core/logic/Result';

export default interface IDeliveryPlanService {
  createDeliveryPlan(deliveryPlanDTO: IDeliveryPlanDTO): Promise<Result<IDeliveryPlanDTO>>;
  getDeliveryPlanById(deliverPlanId: string): Promise<Result<IDeliveryPlanDTO>>;
  getAllDeliveryPlans(): Promise<Result<IDeliveryPlanDTO[]>>;
  updateDeliveryPlan(deliveryPlanDTO: IDeliveryPlanDTO): Promise<Result<IDeliveryPlanDTO>>;
  deleteDeliveryPlanById(deliveryPlanId: string): Promise<Result<boolean>>;
}
