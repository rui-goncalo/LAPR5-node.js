import { Router } from 'express';
import { Container } from 'typedi';
import config from '../../../config';
import { celebrate, Joi } from 'celebrate';
import IPackagingController from '../../controllers/IControllers/IPackagingController';

const route = Router();

export default (app: Router) => {
  app.use('/packaging', route);

  const ctrl = Container.get(config.controllers.packaging.name) as IPackagingController;

  route.get('', (req, res, next) => ctrl.getAllPackagings(req, res, next));

  route.get('/:packagingId', (req, res, next) => ctrl.getPackagingById(req, res, next));

  route.post(
    '',
    celebrate({
      body: Joi.object({
        packagingId: Joi.string().required(),
        packagingX: Joi.string().required(),
        packagingY: Joi.string().required(),
        packagingZ: Joi.string().required(),
        packagingTruck: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.createPackaging(req, res, next),
  );

  route.put(
    '',
    celebrate({
      body: Joi.object({
        packagingId: Joi.string().required(),
        packagingX: Joi.string().required(),
        packagingY: Joi.string().required(),
        packagingZ: Joi.string().required(),
        packagingTruck: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.updatePackaging(req, res, next),
  );

  route.delete('/:packagingId', (req, res, next) => ctrl.deletePackagingById(req, res, next));
};
