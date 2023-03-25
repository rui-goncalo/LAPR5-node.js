import { Request, Response, NextFunction } from 'express';

export default interface ITruckController {
  createTruck(req: Request, res: Response, next: NextFunction);
  getAllTrucks(req: Request, res: Response, next: NextFunction);
  getTruckById(req: Request, res: Response, next: NextFunction);
  updateTruck(req: Request, res: Response, next: NextFunction);
  deleteTruckById(req: Request, res: Response, next: NextFunction);
  inactivateTruck(req: Request, res: Response, next: NextFunction);
  activateTruck(req: Request, res: Response, next: NextFunction);
  checkTruck(req: Request, res: Response, next: NextFunction);
}
