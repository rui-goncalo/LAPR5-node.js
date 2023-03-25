import { Inject, Service } from 'typedi';
import ITruckController from './IControllers/ITruckController';
import config from '../../config';
import ITruckService from '../services/IServices/ITruckService';
import { NextFunction, Request, Response } from 'express';
import { Result } from '../core/logic/Result';
import ITruckDTO from '../dto/Truck/ITruckDTO';
import GoogleAuthService from '../services/googleAuthService'

@Service()
export default class TruckController implements ITruckController {
  constructor(@Inject(config.services.truck.name)
              private truckServiceInstance: ITruckService,
              private googleAuthService: GoogleAuthService) {}

  public async createTruck(req: Request, res: Response, next: NextFunction) {

    try {
      const truckOrError = (await this.truckServiceInstance.createTruck(
        req.params.truckId as string,
        req.body as ITruckDTO,
      )) as Result<ITruckDTO>;

      if (truckOrError.isFailure) {
        return res.status(402).send();
      }

      const truckDTO = truckOrError.getValue();
      return res.json(truckDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async getAllTrucks(req: Request, res: Response, next: NextFunction) {
    //const token = req.headers.authorization.split(" ")[1];
    //await this.googleAuthService.validateToken(token)


    try {
      const trucks = await this.truckServiceInstance.getAllTrucks();
      if (trucks.isFailure) {
        return res.status(402).send();
      }
      const truckDTO = trucks.getValue();
      return res.json(truckDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async getTruckById(req: Request, res: Response, next: NextFunction) {
    try {
      const trucks = await this.truckServiceInstance.getTruckById(req.params.truckId as string);

      if (trucks.isFailure) {
        return res.status(402).send();
      }
      const truckDTO = trucks.getValue();
      return res.json(truckDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async updateTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = (await this.truckServiceInstance.updateTruck(req.body as ITruckDTO)) as Result<ITruckDTO>;

      if (truckOrError.isFailure) {
        return res.status(404).json(truckOrError.error);
      }

      const truckDTO = truckOrError.getValue();
      return res.status(200).json(truckDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async inactivateTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = (await this.truckServiceInstance.inactivateAsync(req.params.truckId as string)) as Result<ITruckDTO>;

      if (truckOrError.isFailure) {
        return res.status(404).json(truckOrError.error);
      }

      const truckDTO = truckOrError.getValue();
      return res.status(200).json(truckDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async activateTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = (await this.truckServiceInstance.activateAsync(req.params.truckId as string)) as Result<ITruckDTO>;

      if (truckOrError.isFailure) {
        return res.status(404).json(truckOrError.error);
      }

      const truckDTO = truckOrError.getValue();
      return res.status(200).json(truckDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async checkTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const active = (await this.truckServiceInstance.checkActivateAsync(req.params.truckId as string)) as Result<boolean>;

      if (active.isSuccess == true) {
        return res.status(200).json(true);
      } else{
        return res.status(200).json(false);
      }
    } catch (e) {
      return next(e);
    }
  }

  async deleteTruckById({ params: { truckId } }: Request, res: Response, next: NextFunction) {
    try {
      const deletedResult = await this.truckServiceInstance.deleteTruck(truckId as string);

      if (deletedResult.isFailure) {
        return res.status(404).send();
      }

      return res.status(200).json({ truckId });
    } catch (e) {
      return next(e);
    }
  }
}
