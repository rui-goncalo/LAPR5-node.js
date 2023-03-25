import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const userSchema = {
    // compare with the approach followed in repos and Services
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const roleSchema = {
    // compare with the approach followed in repos and Services
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
  };

  const routeSchema = {
    // compare with the approach followed in repos and Services
    name: 'routeSchema',
    schema: '../persistence/schemas/routeSchema',
  };

  const truckSchema = {
    name: 'truckSchema',
    schema: '../persistence/schemas/truckSchema',
  };

  const deliveryPlanSchema = {
    name: 'deliveryPlanSchema',
    schema: '../persistence/schemas/deliveryPlanSchema',
  };

  const packagingSchema = {
    name: 'packagingSchema',
    schema: '../persistence/schemas/packagingSchema',
  };

  const tripSchema = {
    name: 'tripSchema',
    schema: '../persistence/schemas/tripSchema',
  };

  const planningRouteSchema = {
    name: 'planningRouteSchema',
    schema: '../persistence/schemas/planningRouteSchema',
  };

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path,
  };

  const truckController = {
    name: config.controllers.truck.name,
    path: config.controllers.truck.path,
  };

  const userController = {
    name: config.controllers.user.name,
    path: config.controllers.user.path,
  };

  const routeController = {
    name: config.controllers.route.name,
    path: config.controllers.route.path,
  };

  const deliveryPlanController = {
    name: config.controllers.deliveryPlan.name,
    path: config.controllers.deliveryPlan.path,
  };

  const packagingController = {
    name: config.controllers.packaging.name,
    path: config.controllers.packaging.path,
  };

  const tripController = {
    name: config.controllers.trip.name,
    path: config.controllers.trip.path,
  };

  const planningRouteController = {
    name: config.controllers.planningRoute.name,
    path: config.controllers.planningRoute.path,
  };

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path,
  };

  const routeRepo = {
    name: config.repos.route.name,
    path: config.repos.route.path,
  };

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path,
  };

  const truckRepo = {
    name: config.repos.truck.name,
    path: config.repos.truck.path,
  };

  const deliveryPlanRepo = {
    name: config.repos.deliveryPlan.name,
    path: config.repos.deliveryPlan.path,
  };

  const packagingRepo = {
    name: config.repos.packaging.name,
    path: config.repos.packaging.path,
  };

  const tripRepo = {
    name: config.repos.trip.name,
    path: config.repos.trip.path,
  };

  const planningRouteRepo = {
    name: config.repos.planningRoute.name,
    path: config.repos.planningRoute.path,
  };

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path,
  };

  const routeService = {
    name: config.services.route.name,
    path: config.services.route.path,
  };

  const truckService = {
    name: config.services.truck.name,
    path: config.services.truck.path,
  };

  const deliveryPlanService = {
    name: config.services.deliveryPlan.name,
    path: config.services.deliveryPlan.path,
  };

  const packagingService = {
    name: config.services.packaging.name,
    path: config.services.packaging.path,
  };

  const tripService = {
    name: config.services.trip.name,
    path: config.services.trip.path,
  };

  const planningRouteService = {
    name: config.services.planningRoute.name,
    path: config.services.planningRoute.path,
  };

  const userService = {
    name: config.services.user.name,
    path: config.services.user.path,
  };


  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [userSchema, roleSchema, routeSchema, truckSchema, deliveryPlanSchema, packagingSchema, tripSchema, planningRouteSchema],
    controllers: [
      roleController,
      userController,
      routeController,
      truckController,
      deliveryPlanController,
      packagingController,
      tripController,
      planningRouteController,
    ],
    repos: [roleRepo, userRepo, routeRepo, truckRepo, deliveryPlanRepo, packagingRepo, tripRepo, planningRouteRepo],
    services: [userService, roleService, routeService, truckService, deliveryPlanService, packagingService, tripService, planningRouteService],
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
