import { Inject, Service } from 'typedi';
import ITripController from './IControllers/ITripController';
import config from '../../config';
import ITripService from '../services/IServices/ITripService';
import { NextFunction, Request, Response } from 'express';
import { Result } from '../core/logic/Result';
import ITripDTO from '../dto/Trip/ITripDTO';

@Service()
export default class TripController implements ITripController {
  constructor(@Inject(config.services.trip.name) private tripServiceInstance: ITripService) {}

  public async createTrip(req: Request, res: Response, next: NextFunction) {
    try {
      const tripOrError = (await this.tripServiceInstance.createTrip(
        req.params.tripId as string,
        req.body as ITripDTO,
      )) as Result<ITripDTO>;

      if (tripOrError.isFailure) {
        return res.status(402).send();
      }

      const tripDTO = tripOrError.getValue();
      return res.json(tripDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async getTripById(req: Request, res: Response, next: NextFunction) {
    try {
      const trips = await this.tripServiceInstance.getTripById(req.params.tripId as string);

      if (trips.isFailure) {
        return res.status(402).send();
      }

      const tripDTO = trips.getValue();
      return res.json(tripDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  async getAllTrips(req: Request, res: Response, next: NextFunction) {
    try {
      const trips = await this.tripServiceInstance.getAllTrips();

      if (trips.isFailure) {
        return res.status(402).send();
      }

      const tripDTO = trips.getValue();
      return res.json(tripDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  async updateTrip(req: Request, res: Response, next: NextFunction) {
    try {
      const tripOrError = (await this.tripServiceInstance.updateTrip(req.body as ITripDTO)) as Result<ITripDTO>;

      if (tripOrError.isFailure) {
        return res.status(404).send();
      }

      const tripDTO = tripOrError.getValue();
      return res.status(200).json(tripDTO);
    } catch (e) {
      return next(e);
    }
  }

  async deleteTripById({ params: { tripId } }: Request, res: Response, next: NextFunction) {
    try {
      const deletedResult = await this.tripServiceInstance.deleteTrip(tripId as string);

      if (deletedResult.isFailure) {
        return res.status(404).send();
      }

      return res.status(200).json({ tripId });
    } catch (e) {
      return next(e);
    }
  }
}
