import { Inject, Service } from "typedi";
import config from "../../config";
import { Result } from "../core/logic/Result";
import IUserService from "./IServices/IUserService";
import { User } from "../domain/User/user";
import { UserEmail } from "../domain/User/userEmail";
import { randomBytes } from "crypto";
import argon2 from "argon2";
import { UserPassword } from "../domain/User/userPassword";
import { UserName } from "../domain/User/userName";
import { UserPhoneNumber } from "../domain/User/userPhoneNumber";
import { UserRole } from "../domain/User/userRole";
import { UserMap } from "../mappers/UserMap";
import IUserDTO from "../dto/IUserDTO";
import IUserRepo from "../repos/IRepos/IUserRepo";


@Service()
export default class UserService implements IUserService {
  constructor(@Inject(config.repos.user.name) private userRepo: IUserRepo) {
  }

  public async createUser(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO, token: string }>> {
    try {
      let userDocument = (await this.userRepo.find({ email: userDTO.email }))[0];

      if (userDocument != null) {
        return Result.fail<{ userDTO: IUserDTO, token: string }>("User already exists with email=" + userDTO.email);
      }

      const salt = randomBytes(32);
      const hashedPassword = await argon2.hash(userDTO.password, { salt });

      const userOrError = await User.create({
        email: UserEmail.create(userDTO.email).getValue(),
        password: UserPassword.create(hashedPassword).getValue(),
        firstName: UserName.create(userDTO.firstName).getValue(),
        lastName: UserName.create(userDTO.lastName).getValue(),
        phoneNumber: UserPhoneNumber.create(userDTO.phoneNumber).getValue(),
        role: UserRole.create(userDTO.role).getValue()
      });

      if (userOrError.isFailure) {
        return Result.fail<{ userDTO: IUserDTO, token: string }>(userOrError.errorValue());
      }

      const userResult = userOrError.getValue();

      await this.userRepo.save(userResult);
      const userDTOResult = UserMap.toDTO(userResult) as IUserDTO;
      return Result.ok<{ userDTO: IUserDTO, token: string }>({
        userDTO: userDTOResult,
        token: "User created successfully."
      });
    } catch (e) {
      throw e;
    }
  }

  public async getUser(userEmail: { email: string }): Promise<Result<IUserDTO>> {
    try {
      const userList = await this.userRepo.find(userEmail);

      if (userList.length == 0) {
        return Result.fail<IUserDTO>("Users not found.");
      }

      const result = UserMap.toDTO(userList[0]) as IUserDTO;
      console.log(result)
      return Result.ok<IUserDTO>(result);
    } catch (e) {
      throw e;
    }
  }

  async getUserById(userId: string): Promise<Result<IUserDTO>> {
    try {
      let user = await this.userRepo.findById(userId);

      if (user === null) {
        return Result.fail<IUserDTO>('User not found');
      } else {
        const userDTOResult = UserMap.toDTO(user) as IUserDTO;
        return Result.ok<IUserDTO>(userDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  async updateUser(userDTO: IUserDTO): Promise<Result<IUserDTO>> {
    try {
      const exists = await this.userRepo.findById(userDTO.email);

      if (!exists) {
        return Result.fail<IUserDTO>('User not found.');
      }

      const updatedUser = await this.userRepo.update(UserMap.toDomain(userDTO));
      const userDTOResult = UserMap.toDTO(updatedUser) as IUserDTO;
      return Result.ok<IUserDTO>(userDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async deleteUser(userEmail: { email: string }): Promise<Result<{ userDTO: IUserDTO, token: string }>> {
    try {
      const userList = (await this.userRepo.find(userEmail))[0];

      if (!userList) {
        return Result.fail<{ userDTO: IUserDTO, token: string }>("User not found.");
      }

      await this.userRepo.delete(userEmail);
      return Result.ok<{ userDTO: IUserDTO, token: string }>({
        userDTO: UserMap.toDTO(userList),
        token: "User deleted successfully."
      });
    } catch (e) {
      throw e;
    }
  }

  public async getAllUsers(): Promise<Result<IUserDTO[]>> {
    try {
      let users = await this.userRepo.findAllUsers();

      if (users == null) {
        return Result.fail("There's no users available'");
      }

      const userDTOres = users.map(item => UserMap.toDTO(item));
      return Result.ok<IUserDTO[]>(userDTOres);
    } catch (e) {
      throw e;
    }
  }

  public async getUserLogin(query: any, password: string): Promise<Result<IUserDTO>> {
    try {
      const userList = await this.userRepo.find(query);

      if (userList.length == 0) {
        return Result.fail<IUserDTO>("Users not found.");
      }

      const validPassword = await argon2.verify(userList[0].password.value, password);

      if (!validPassword) {
        return Result.fail<IUserDTO>("Wrong password.");
      }

      const result = UserMap.toDTO(userList[0]) as IUserDTO;
      return Result.ok<IUserDTO>(result);
    } catch (e) {
      throw e;
    }
  }
}
