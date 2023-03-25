import { NextFunction, Request, Response } from "express";
import { Inject, Service } from "typedi";
import config from "../../config";
import { Result } from "../core/logic/Result";

import IUserService from "../services/IServices/IUserService";
import IUserController from "./IControllers/IUserController";
import IUserDTO from "../dto/IUserDTO";

@Service()
export default class UserController implements IUserController {
  constructor(@Inject(config.services.user.name) private userServiceInstance: IUserService) {
  }

  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userOrError = await this.userServiceInstance.createUser(req.body as IUserDTO) as Result<{ userDTO: IUserDTO, token: string }>;

      if (userOrError.isFailure) {
        return res.status(400).json(userOrError.error);
      }

      const userDTO = userOrError.getValue();
      return res.status(201).json(userDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async findUser(req: Request, res: Response, next: NextFunction) {

    //const token = req.headers.authorization.split(" ")[1];
    //await this.googleAuthService.validateToken(token);
    try {
      const emailParameter = req.query.email as string;

      const userOrError = await this.userServiceInstance.getUser({ email: emailParameter });

      if (userOrError.isFailure) {
        return res.status(404).json(userOrError.error);
      }

      const userDTO = userOrError.getValue();
      return res.status(200).json(userDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userOrError = (await this.userServiceInstance.updateUser(req.body as IUserDTO)) as Result<IUserDTO>;

      if (userOrError.isFailure) {
        return res.status(404).json(userOrError.error);
      }

      const userDTO = userOrError.getValue();
      return res.status(200).json(userDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userServiceInstance.getUserById(req.params.email as string);

      if (users.isFailure) {
        return res.status(402).send();
      }
      const userDTO = users.getValue();
      return res.json(userDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const emailParameter = req.query.email as string;

      const routeOrError = await this.userServiceInstance.deleteUser({ email: emailParameter });

      if (routeOrError.isFailure) {
        return res.status(404).json(routeOrError.error);
      }

      const routeDTO = routeOrError.getValue();
      return res.status(200).json(routeDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async findUserLogin(req: Request, res: Response, next: NextFunction) {

    //const token = req.headers.authorization.split(" ")[1];
    //await this.googleAuthService.validateToken(token);
    try {
      const emailParameter = req.query.email as string;
      const passwordParameter = req.query.password as string;

      const userOrError = await this.userServiceInstance.getUserLogin({ email: emailParameter }, passwordParameter);

      if (userOrError.isFailure) {
        return res.status(404).json(userOrError.error);
      }

      const userDTO = userOrError.getValue();
      return res.status(200).json(userDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    //const token = req.headers.authorization.split(" ")[1];
    //await this.googleAuthService.validateToken(token)

    try {
      const trucks = await this.userServiceInstance.getAllUsers();
      if (trucks.isFailure) {
        return res.status(402).send();
      }
      const truckDTO = trucks.getValue();
      return res.json(truckDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

}
