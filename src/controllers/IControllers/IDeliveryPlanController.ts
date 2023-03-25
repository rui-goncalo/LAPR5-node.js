import { Request, Response, NextFunction } from 'express';

export default interface IDeliveryPlanController {
  createDeliveryPlan(req: Request, res: Response, next: NextFunction);
  getDeliveryPlanById(req: Request, res: Response, next: NextFunction);
  getAllDeliveryPlans(req: Request, res: Response, next: NextFunction);
  updateDeliveryPlan(req: Request, res: Response, next: NextFunction);
  deleteDeliveryPlanById(req: Request, res: Response, next: NextFunction);
}
