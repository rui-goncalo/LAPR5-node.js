import { Inject, Service } from 'typedi';
import IDeliveryPlanController from './IControllers/IDeliveryPlanController';
import config from '../../config';
import IDeliveryPlanService from '../services/IServices/IDeliveryPlanService';
import { NextFunction, Request, Response } from 'express';
import IDeliveryPlanDTO from '../dto/DeliveryPlan/IDeliveryPlanDTO';
import { Result } from '../core/logic/Result';
import ITripDTO from '../dto/Trip/ITripDTO';

@Service()
export default class DeliveryPlanController implements IDeliveryPlanController {
  constructor(@Inject(config.services.deliveryPlan.name) private deliveryPlanServiceInstance: IDeliveryPlanService) {}

  public async createDeliveryPlan(req: Request, res: Response, next: NextFunction) {
    try {
      const dpOrError = (await this.deliveryPlanServiceInstance.createDeliveryPlan(
        req.body as IDeliveryPlanDTO,
      )) as Result<IDeliveryPlanDTO>;
      if (dpOrError.isFailure) {
        return res.status(402).send();
      }

      const dpDTO = dpOrError.getValue();
      return res.json(dpDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async getDeliveryPlanById(req: Request, res: Response, next: NextFunction) {
    try {
      const deliveries = await this.deliveryPlanServiceInstance.getDeliveryPlanById(
        req.params.deliveryPlanId as string,
      );

      if (deliveries.isFailure) {
        return res.status(402).send();
      }

      const dpDTO = deliveries.getValue();
      return res.json(dpDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  async getAllDeliveryPlans(req: Request, res: Response, next: NextFunction) {
    try {
      const deliveries = await this.deliveryPlanServiceInstance.getAllDeliveryPlans();

      if (deliveries.isFailure) {
        return res.status(402).send();
      }

      const dpDTO = deliveries.getValue();
      return res.json(dpDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  async deleteDeliveryPlanById({ params: { deliveryPlanId } }: Request, res: Response, next: NextFunction) {
    try {
      const deletedResult = await this.deliveryPlanServiceInstance.deleteDeliveryPlanById(deliveryPlanId as string);

      if (deletedResult.isFailure) {
        return res.status(404).send();
      }

      return res.status(200).json({ deliveryPlanId });
    } catch (e) {
      return next(e);
    }
  }

  async updateDeliveryPlan(req: Request, res: Response, next: NextFunction) {
    try {
      const dpOrError = (await this.deliveryPlanServiceInstance.updateDeliveryPlan(
        req.body as IDeliveryPlanDTO,
      )) as Result<IDeliveryPlanDTO>;

      if (dpOrError.isFailure) {
        return res.status(404).send();
      }

      const dpDTO = dpOrError.getValue();
      return res.status(200).json(dpDTO);
    } catch (e) {
      return next(e);
    }
  }
}
