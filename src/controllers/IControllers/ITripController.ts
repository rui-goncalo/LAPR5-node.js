import { NextFunction, Request, Response } from 'express';

export default interface ITripController {
  createTrip(req: Request, res: Response, next: NextFunction);
  getTripById(req: Request, res: Response, next: NextFunction);
  getAllTrips(req: Request, res: Response, next: NextFunction);
  updateTrip(req: Request, res: Response, next: NextFunction);
  deleteTripById(req: Request, res: Response, next: NextFunction);
}
