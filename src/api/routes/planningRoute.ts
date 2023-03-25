import { Router } from 'express';
import {Container} from "typedi";
import config from "../../../config";
import IPlanningRouteController from "../../controllers/IControllers/IPlanningRouteController";

const route = Router();

export default (app: Router) => {
    app.use('/planningRoute', route);

    const ctrl = Container.get(config.controllers.planningRoute.name) as IPlanningRouteController;

    route.get('/getBestRoute/:date/:truckId', (req, res, next) => ctrl.getBestRoute(req, res, next));
    route.get('/getHDist/:date/:truckId', (req, res, next) => ctrl.getHDist(req, res, next));
    route.get('/getHMassa/:date/:truckId', (req, res, next) => ctrl.getHMassa(req, res, next));
    route.get('/getHMassaTempo/:date/:truckId', (req, res, next) => ctrl.getHMassaTempo(req, res, next));
    route.get('/getAlgGen/:date/:truckId', (req, res, next) => ctrl.getAlgGen(req, res, next));
}