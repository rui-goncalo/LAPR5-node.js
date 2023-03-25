import {Result} from '../../core/logic/Result';
import IUserDTO from "../../dto/IUserDTO";

export default interface IUserService {
  createUser(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO, token: string }>>;

  getUser(userEmail: { email: string }): Promise<Result<IUserDTO>>;

  updateUser(userDTO: IUserDTO): Promise<Result<IUserDTO>>;

  getUserById(userId: string): Promise<Result<IUserDTO>>;

  deleteUser(userEmail: { email: string }): Promise<Result<{ userDTO: IUserDTO, token: string }>>;

  getAllUsers(): Promise<Result<IUserDTO[]>>;

  getUserLogin(query: any, password: string): Promise<Result<IUserDTO>>;
}
