import { Inject, Service } from 'typedi';
import IPackagingController from './IControllers/IPackagingController';
import { NextFunction, Request, Response } from 'express';
import IPackagingService from '../services/IServices/IPackagingService';
import config from '../../config';
import IPackagingDTO from '../dto/Packaging/IPackagingDTO';
import { Result } from '../core/logic/Result';
import ITripDTO from '../dto/Trip/ITripDTO';

@Service()
export default class PackagingController implements IPackagingController {
  constructor(@Inject(config.services.packaging.name) private packagingServiceInstance: IPackagingService) {}

  public async createPackaging(req: Request, res: Response, next: NextFunction) {
    try {
      const packagingOrError = (await this.packagingServiceInstance.createPackaging(
        req.params.routeId as string,
        req.body as IPackagingDTO,
      )) as Result<IPackagingDTO>;

      if (packagingOrError.isFailure) {
        return res.status(402).send();
      }

      const packagingDTO = packagingOrError.getValue();
      return res.json(packagingDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async getPackagingById(req: Request, res: Response, next: NextFunction) {
    try {
      const packagings = await this.packagingServiceInstance.getPackagingById(req.params.packagingId as string);

      if (packagings.isFailure) {
        return res.status(402).send();
      }

      const packagingDTO = packagings.getValue();
      return res.json(packagingDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async getAllPackagings(req: Request, res: Response, next: NextFunction) {
    try {
      const packagings = await this.packagingServiceInstance.getAllPackagings();

      if (packagings.isFailure) {
        return res.status(402).send();
      }

      const packagingDTO = packagings.getValue();
      return res.json(packagingDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  async updatePackaging(req: Request, res: Response, next: NextFunction) {
    try {
      const packOrError = (await this.packagingServiceInstance.updatePackaging(req.body as IPackagingDTO)) as Result<
        IPackagingDTO
      >;

      if (packOrError.isFailure) {
        return res.status(404).send();
      }

      const packDTO = packOrError.getValue();
      return res.status(200).json(packDTO);
    } catch (e) {
      return next(e);
    }
  }

  async deletePackagingById({ params: { packagingId } }: Request, res: Response, next: NextFunction) {
    try {
      const deletedResult = await this.packagingServiceInstance.deletePackaging(packagingId as string);

      if (deletedResult.isFailure) {
        return res.status(404).send();
      }

      return res.status(200).json({ packagingId });
    } catch (e) {
      return next(e);
    }
  }
}
