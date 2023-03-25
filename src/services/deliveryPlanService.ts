import { Inject, Service } from 'typedi';
import IDeliveryPlanService from './IServices/IDeliveryPlanService';
import config from '../../config';
import IDeliveryPlanRepo from '../repos/IRepos/IDeliveryPlanRepo';
import IDeliveryPlanDTO from '../dto/DeliveryPlan/IDeliveryPlanDTO';
import { Result } from '../core/logic/Result';
import { DeliveryPlan } from '../domain/DeliveryPlan/deliveryPlan';
import { DeliveryPlanMap } from '../mappers/deliveryPlanMap';

@Service()
export default class DeliveryPlanService implements IDeliveryPlanService {
  constructor(@Inject(config.repos.deliveryPlan.name) private deliveryPlanRepo: IDeliveryPlanRepo) {}

  async createDeliveryPlan(deliveryPlanDTO: IDeliveryPlanDTO): Promise<Result<IDeliveryPlanDTO>> {
    try {
      const deliveryPlan = await this.deliveryPlanRepo.findByDeliveryPlanId(deliveryPlanDTO.deliveryPlanId);

      if (deliveryPlan != null) {
        return Result.fail<IDeliveryPlanDTO>('Delivery Plan already exists: ' + deliveryPlanDTO.deliveryPlanId);
      }

      const deliveryPlanOrError = await DeliveryPlan.create(deliveryPlanDTO);

      if (deliveryPlanOrError.isFailure) {
        return Result.fail<IDeliveryPlanDTO>(deliveryPlanOrError.errorValue());
      }
      const deliveryPlanRes = deliveryPlanOrError.getValue();

      await this.deliveryPlanRepo.save(deliveryPlanRes);

      const dpDTORes = DeliveryPlanMap.toDTO(deliveryPlanRes) as IDeliveryPlanDTO;
      return Result.ok<IDeliveryPlanDTO>(dpDTORes);
    } catch (e) {
      throw e;
    }
  }

  async getDeliveryPlanById(deliveryPlanId: string): Promise<Result<IDeliveryPlanDTO>> {
    try {
      let getdeliveryPlan = await this.deliveryPlanRepo.findByDeliveryPlanId(deliveryPlanId);

      if (getdeliveryPlan == null) {
        return Result.fail('No delivery plan available.');
      }
      const dpDTORes = DeliveryPlanMap.toDTO(getdeliveryPlan) as IDeliveryPlanDTO;
      return Result.ok<IDeliveryPlanDTO>(dpDTORes);
    } catch (e) {
      throw e;
    }
  }

  async getAllDeliveryPlans(): Promise<Result<IDeliveryPlanDTO[]>> {
    try {
      let deliveryPlans = await this.deliveryPlanRepo.getAllDeliveryPlans();

      if (deliveryPlans == null) {
        return Result.fail('No delivery plans available.');
      }
      const dpDTORes = deliveryPlans.map(item => DeliveryPlanMap.toDTO(item));

      return Result.ok<IDeliveryPlanDTO[]>(dpDTORes);
    } catch (e) {
      throw e;
    }
  }

  async deleteDeliveryPlanById(deliveryPlanId: string): Promise<Result<boolean>> {
    try {
      const exists = await this.deliveryPlanRepo.findByDeliveryPlanId(deliveryPlanId);

      if (!exists) {
        return Result.fail(false);
      }

      await this.deliveryPlanRepo.delete(deliveryPlanId);
      return Result.ok(true);
    } catch (e) {
      throw e;
    }
  }

  async updateDeliveryPlan(deliveryPlanDTO: IDeliveryPlanDTO): Promise<Result<IDeliveryPlanDTO>> {
    try {
      const exists = await this.deliveryPlanRepo.findByDeliveryPlanId(deliveryPlanDTO.deliveryPlanId);

      if (!exists) {
        return Result.fail<IDeliveryPlanDTO>('Delivery Plan not found.');
      }

      const updatedDP = await this.deliveryPlanRepo.update(DeliveryPlanMap.toDomain(deliveryPlanDTO));
      const dpDTOResult = DeliveryPlanMap.toDTO(updatedDP) as IDeliveryPlanDTO;
      return Result.ok<IDeliveryPlanDTO>(dpDTOResult);
    } catch (e) {
      throw e;
    }
  }
}
