import { NextFunction, Request, Response } from 'express';

export default interface IRouteController {
  createRoute(req: Request, res: Response, next: NextFunction);
  getRouteById(req: Request, res: Response, next: NextFunction);
  getAllRoutes(req: Request, res: Response, next: NextFunction);
  updateRoute(req: Request, res: Response, next: NextFunction);
  deleteRouteById(req: Request, res: Response, next: NextFunction);
}
