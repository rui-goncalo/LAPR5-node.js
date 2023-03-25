import { NextFunction, Request, Response } from 'express';

export default interface IPackagingController {
  createPackaging(req: Request, res: Response, next: NextFunction);
  getPackagingById(req: Request, res: Response, next: NextFunction);
  getAllPackagings(req: Request, res: Response, next: NextFunction);
  updatePackaging(req: Request, res: Response, next: NextFunction);
  deletePackagingById(req: Request, res: Response, next: NextFunction);
}
