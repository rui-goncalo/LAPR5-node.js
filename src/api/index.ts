import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import route from './routes/routeRoute';
import truck from './routes/truckRoute';
import deliveryPlan from './routes/deliveryPlanRoute';
import packaging from './routes/packagingRoute';
import trip from './routes/tripRoute';
import planningRoute from "./routes/planningRoute";

export default () => {
  const app = Router();

  auth(app);
  user(app);
  role(app);
  route(app);
  truck(app);
  deliveryPlan(app);
  packaging(app);
  trip(app);
  planningRoute(app);

  return app;
};
