import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import config from '../../../config';
import ITruckController from '../../controllers/IControllers/ITruckController';

const route = Router();

export default (app: Router) => {
  app.use('/trucks', route);

  const ctrl = Container.get(config.controllers.truck.name) as ITruckController;

  route.post(
    '',
    celebrate({
      body: Joi.object({
        truckId: Joi.string().required(),
        registration: Joi.string().required(),
        batteryCap: Joi.string().required(),
        maxBatteryCap: Joi.string().required(),
        electricRange: Joi.string().required(),
        chargeTime: Joi.string().required(),
        tareWeight: Joi.string().required(),
        isActive: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.createTruck(req, res, next),
  );

  route.get('', (req, res, next) => ctrl.getAllTrucks(req, res, next));
  route.get('/:truckId', (req, res, next) => ctrl.getTruckById(req, res, next));

  route.put(
    '',
    celebrate({
      body: Joi.object({
        truckId: Joi.string().required(),
        registration: Joi.string().required(),
        batteryCap: Joi.string().required(),
        maxBatteryCap: Joi.string().required(),
        electricRange: Joi.string().required(),
        chargeTime: Joi.string().required(),
        tareWeight: Joi.string().required(),
        isActive: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.updateTruck(req, res, next),
  );

  route.patch('/inactivate/:truckId', (req, res, next) => ctrl.inactivateTruck(req, res, next));
  route.patch('/activate/:truckId', (req, res, next) => ctrl.activateTruck(req, res, next));

  route.get('/check/:truckId', (req, res, next) => ctrl.checkTruck(req, res, next));


  route.delete('/:truckId', (req, res, next) => ctrl.deleteTruckById(req, res, next));
};
