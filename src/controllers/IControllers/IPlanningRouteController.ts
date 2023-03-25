import {NextFunction, Request, Response} from "express";

export default interface IPlanningRouteController {
    getBestRoute(req: Request, res: Response, next: NextFunction);
    getHDist(req: Request, res: Response, next: NextFunction);
    getHMassa(req: Request, res: Response, next: NextFunction);
    getHMassaTempo(req: Request, res: Response, next: NextFunction);
    getAlgGen(req: Request, res: Response, next: NextFunction);
}
