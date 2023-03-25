import { Router } from 'express';
import { Container } from 'typedi';
import config from '../../../config';
import { celebrate, Joi } from 'celebrate';
import ITripController from '../../controllers/IControllers/ITripController';

const route = Router();

export default (app: Router) => {
  app.use('/trip', route);

  const ctrl = Container.get(config.controllers.trip.name) as ITripController;

  route.get('', (req, res, next) => ctrl.getAllTrips(req, res, next));

  route.get('/:tripId', (req, res, next) => ctrl.getTripById(req, res, next));

  route.post(
    '',
    celebrate({
      body: Joi.object({
        tripId: Joi.string().required(),
        tripRoutes: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.createTrip(req, res, next),
  );

  route.put(
    '',
    celebrate({
      body: Joi.object({
        tripId: Joi.string().required(),
        tripRoutes: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.updateTrip(req, res, next),
  );

  route.delete('/:tripId', (req, res, next) => ctrl.deleteTripById(req, res, next));
};
