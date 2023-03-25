import { Router } from 'express';
import { Container } from 'typedi';
import config from '../../../config';
import IRouteController from '../../controllers/IControllers/IRouteController';
import { celebrate, Joi } from 'celebrate';

const route = Router();

export default (app: Router) => {
  app.use('/routes', route);

  const ctrl = Container.get(config.controllers.route.name) as IRouteController;

  route.get('', (req, res, next) => ctrl.getAllRoutes(req, res, next));

  route.get('/:routeId', (req, res, next) => ctrl.getRouteById(req, res, next));

  route.post(
    '',
    celebrate({
      body: Joi.object({
        routeId: Joi.string().required(),
        origin: Joi.string().required(),
        destination: Joi.string().required(),
        distance: Joi.string().required(),
        timeDistance: Joi.string().required(),
        energySpent: Joi.string().required(),
        extraTimeBattery: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.createRoute(req, res, next),
  );

  route.put(
    '',
    celebrate({
      body: Joi.object({
        routeId: Joi.string().required(),
        origin: Joi.string().required(),
        destination: Joi.string().required(),
        distance: Joi.string().required(),
        timeDistance: Joi.string().required(),
        energySpent: Joi.string().required(),
        extraTimeBattery: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.updateRoute(req, res, next),
  );

  route.delete('/:routeId', (req, res, next) => ctrl.deleteRouteById(req, res, next));
};
