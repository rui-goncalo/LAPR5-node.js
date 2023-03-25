import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 3000,

  /**
   * That long string from mlab
   */
  databaseURL:
    process.env.MONGODB_URI || 'mongodb://mongoadmin:9814c97cfb3e1dce96e79357@vsgate-s1.dei.isep.ipp.pt:11004/admin',
  //'mongodb://mongoadmin:a26adb97b936895073bbd0bf@vsgate-s1.dei.isep.ipp.pt:10612/admin'

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || 'my sakdfho2390asjod$%jl)!sdjas0i secret',

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    user: {
      name: 'UserController',
      path: '../controllers/userController',
    },
    role: {
      name: 'RoleController',
      path: '../controllers/roleController',
    },
    route: {
      name: 'RouteController',
      path: '../controllers/routeController',
    },
    truck: {
      name: 'TruckController',
      path: '../controllers/truckController',
    },
    deliveryPlan: {
      name: 'DeliveryPlanController',
      path: '../controllers/deliveryPlanController',
    },
    packaging: {
      name: 'PackagingController',
      path: '../controllers/packagingController',
    },
    trip: {
      name: 'TripController',
      path: '../controllers/tripController',
    },
    planningRoute: {
      name: 'PlanningRouteController',
      path: '../controllers/planningRouteController',
    },
  },

  repos: {
    role: {
      name: 'RoleRepo',
      path: '../repos/roleRepo',
    },
    user: {
      name: 'UserRepo',
      path: '../repos/userRepo',
    },
    route: {
      name: 'RouteRepo',
      path: '../repos/routeRepo',
    },
    truck: {
      name: 'TruckRepo',
      path: '../repos/truckRepo',
    },
    deliveryPlan: {
      name: 'DeliveryPlanRepo',
      path: '../repos/deliveryPlanRepo',
    },
    packaging: {
      name: 'PackagingRepo',
      path: '../repos/packagingRepo',
    },
    trip: {
      name: 'TripRepo',
      path: '../repos/tripRepo',
    },
    planningRoute: {
      name: 'PlanningRouteRepo',
      path: '../repos/planningRouteRepo',
    },

  },

  services: {
    role: {
      name: 'RoleService',
      path: '../services/roleService',
    },
    route: {
      name: 'RouteService',
      path: '../services/routeService',
    },
    truck: {
      name: 'TruckService',
      path: '../services/truckService',
    },
    deliveryPlan: {
      name: 'DeliveryPlanService',
      path: '../services/deliveryPlanService',
    },
    packaging: {
      name: 'PackagingService',
      path: '../services/packagingService',
    },
    trip: {
      name: 'TripService',
      path: '../services/tripService',
    },
    planningRoute: {
      name: 'PlanningRouteService',
      path: '../services/planningRouteService',
    },
    user: {
      name: 'UserService',
      path: '../services/userService',
    },
  },
};
