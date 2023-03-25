import {Inject, Service} from "typedi";
import IPlanningRouteController from "./IControllers/IPlanningRouteController";
import config from "../../config";
import {NextFunction, Request, Response} from "express";
import IPlanningRouteService from "../services/IServices/IPlanningRouteService";

@Service()
export default class PlanningRouteController implements IPlanningRouteController {
    constructor(@Inject(config.services.planningRoute.name) private planningRouteServiceInstance: IPlanningRouteService) {}

    public async getBestRoute(req: Request, res: Response, next: NextFunction) {
        try {
            const planningRouteOrError = await this.planningRouteServiceInstance.getBestRoute(req.params.date, req.params.truckId);

            return res.json(planningRouteOrError.getValue().viagemR).status(201);
        } catch (e) {
            return next(e);
        }
    }

    public async getHDist(req: Request, res: Response, next: NextFunction) {
        try {
            const planningRouteOrError = await this.planningRouteServiceInstance.getHDist(req.params.date, req.params.truckId);

            return res.json(planningRouteOrError.getValue().viagemR).status(201);
        } catch (e) {
            return next(e);
        }
    }

    public async getHMassa(req: Request, res: Response, next: NextFunction) {
        try {
            const planningRouteOrError = await this.planningRouteServiceInstance.getHMassa(req.params.date, req.params.truckId);

            return res.json(planningRouteOrError.getValue().viagemR).status(201);
        } catch (e) {
            return next(e);
        }
    }

    public async getHMassaTempo(req: Request, res: Response, next: NextFunction) {
        try {
            const planningRouteOrError = await this.planningRouteServiceInstance.getHMassaTempo(req.params.date, req.params.truckId);

            return res.json(planningRouteOrError.getValue().viagemR).status(201);
        } catch (e) {
            return next(e);
        }
    }

    public async getAlgGen(req: Request, res: Response, next: NextFunction) {
        try {
            const planningRouteOrError = await this.planningRouteServiceInstance.getAlgGen(req.params.date, req.params.truckId);

            return res.json(planningRouteOrError.getValue().viagemR).status(201);
        } catch (e) {
            return next(e);
        }
    }


}