import { Router } from 'express';
import { Container } from 'typedi';
import config from '../../../config';
import IDeliveryPlanController from '../../controllers/IControllers/IDeliveryPlanController';
import { celebrate, Joi } from 'celebrate';

const route = Router();

export default (app: Router) => {
  app.use('/deliveryPlan', route);

  const ctrl = Container.get(config.controllers.deliveryPlan.name) as IDeliveryPlanController;

  route.get('', (req, res, next) => ctrl.getAllDeliveryPlans(req, res, next));

  route.get('/:deliveryPlanId', (req, res, next) => ctrl.getDeliveryPlanById(req, res, next));

  route.post(
    '',
    celebrate({
      body: Joi.object({
        deliveryPlanId: Joi.string().required(),
        deliveryPlanDeliveries: Joi.array().items(Joi.string()),
      }),
    }),
    (req, res, next) => ctrl.createDeliveryPlan(req, res, next),
  );

  route.put(
    '',
    celebrate({
      body: Joi.object({
        deliveryPlanId: Joi.string().required(),
        deliveryPlanDeliveries: Joi.array().items(Joi.string()),
      }),
    }),
    (req, res, next) => ctrl.updateDeliveryPlan(req, res, next),
  );

  route.delete('/:deliveryPlanId', (req, res, next) => ctrl.deleteDeliveryPlanById(req, res, next));
};
