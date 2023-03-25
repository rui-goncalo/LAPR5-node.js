import { Inject, Service } from 'typedi';
import IPackagingRepo from './IRepos/IPackagingRepo';
import { Document, FilterQuery, Model } from 'mongoose';
import { IPackagingPersistence } from '../persistence/dataschema/IPackagingPersistence';
import { PackagingId } from '../domain/Packaging/packagingId';
import { Packaging } from '../domain/Packaging/packaging';
import { PackagingMap } from '../mappers/packagingMap';
import { TripMap } from '../mappers/TripMap';
import { ITripPersistence } from '../persistence/dataschema/ITripPersistence';

@Service()
export default class PackagingRepo implements IPackagingRepo {
  private models: any;

  constructor(@Inject('packagingSchema') private packagingSchema: Model<IPackagingPersistence & Document>) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  // @ts-ignore
  public async exists(packagingId: PackagingId | string): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-angle-bracket-type-assertion
    const idX = packagingId instanceof PackagingId ? (<PackagingId>packagingId).value : packagingId;

    const query = { domainId: idX };
    const userDocument = await this.packagingSchema.findOne(query);

    return !!userDocument === true;
  }

  public async save(packaging: Packaging): Promise<Packaging> {
    const query = { packagingId: packaging.packagingId.value };
    const packagingDoc = await this.packagingSchema.findOne(query);

    try {
      if (packagingDoc === null) {
        const rawRepo: any = PackagingMap.toPersistence(packaging);
        const packCreated = await this.packagingSchema.create(rawRepo);

        return PackagingMap.toDomain(packCreated);
      } else {
        packagingDoc.packagingId = packaging.packagingId.value;
        packagingDoc.packagingX = packaging.packagingX;
        packagingDoc.packagingY = packaging.packagingY;
        packagingDoc.packagingZ = packaging.packagingZ;
        packagingDoc.packagingTruck = packaging.packagingTruck;

        await packagingDoc.save();

        return packaging;
      }
    } catch (err) {
      throw err;
    }
  }

  async findByPackagingId(packagingId: PackagingId | string): Promise<Packaging> {
    const query = { packagingId: packagingId };

    const packRecord = await this.packagingSchema.findOne(query as FilterQuery<IPackagingPersistence & Document>);

    if (packRecord != null) {
      return PackagingMap.toDomain(packRecord);
    } else return null;
  }

  async getAllPackagings(): Promise<Packaging[]> {
    const packArray = await this.packagingSchema.find();

    return packArray.map(item => PackagingMap.toDomain(item));
  }

  async delete(packagingId: PackagingId | string) {
    const query = { packagingId: packagingId };
    await this.packagingSchema.deleteOne(query as FilterQuery<IPackagingPersistence & Document>);
  }

  async update(packaging: Packaging): Promise<Packaging> {
    // @ts-ignore
    await this.packagingSchema.updateOne({ packagingId: packaging.packagingId.value }, PackagingMap.toDTO(packaging));
    // verify here if the update was successful, else throw excp
    const updatedPackaging = await this.packagingSchema.findOne({ packagingId: packaging.packagingId.value });

    return PackagingMap.toDomain(updatedPackaging);
  }
}
