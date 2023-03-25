import { Inject, Service } from "typedi";
import { Document, Model, FilterQuery } from "mongoose";
import { User } from "../domain/User/user";
import { IUserPersistence } from "../persistence/dataschema/IUserPersistence";
import { UserMap } from "../mappers/UserMap";
import IUserRepo from "./IRepos/IUserRepo";
import { UserEmail } from "../domain/User/userEmail";

@Service()
export default class UserRepo implements IUserRepo {

  constructor(@Inject("userSchema") private userSchema: Model<IUserPersistence & Document>) {
  }

  exists(t: User): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  public async save(user: User): Promise<User> {
    const query = { email: user.email.value };
    const userDocument = await this.userSchema.findOne(query);

    try {
      if (userDocument === null) {
        const rawUser: any = UserMap.toPersistence(user);
        const userCreated = await this.userSchema.create(rawUser);
        return UserMap.toDomain(userCreated);
      } else {
        userDocument.email = user.email.value;
        userDocument.password = user.password.value;
        userDocument.firstName = user.firstName.value;
        userDocument.lastName = user.lastName.value;
        userDocument.phoneNumber = user.phoneNumber.value;
        userDocument.role = user.role.value;

        await userDocument.save();
        return user;
      }
    } catch (err) {
      throw err;
    }
  }

  public async find(query?: any): Promise<User[]> {
    const userRecord = await this.userSchema.find(query);

    if (userRecord != null) {
      return (userRecord.map((postRecord) => UserMap.toDomain(postRecord)));
    }
    return null;
  }

  public async findById(userId: UserEmail | string): Promise<User> {
    const query = { userEmail: userId };
    const userRecord = await this.userSchema.findOne(query as FilterQuery<IUserPersistence & Document>);

    if (userRecord != null) {
      return UserMap.toDomain(userRecord);
    } else return null;
  }

  async update(user: User): Promise<User> {
    // @ts-ignore
    await this.userSchema.updateOne({ email: user.email.value }, UserMap.toDTO(user));
    // verify here if the update was successful, else throw excp
    const updatedUser = await this.userSchema.findOne({ email: user.email.value });

    return UserMap.toDomain(updatedUser);
  }

  public async delete(query: any): Promise<User> {
    const userRecord = await this.userSchema.findOne(query);

    if (userRecord != null) {
      userRecord.remove();
      return UserMap.toDomain(userRecord);
    }
    return null;
  }

  public async findAllUsers(): Promise<User[]> {
    const arr = await this.userSchema.find();
    return arr.map(item => UserMap.toDomain(item));
  }
}
