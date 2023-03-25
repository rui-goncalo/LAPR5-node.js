import { Packaging } from '../domain/Packaging/packaging';
import { Mapper } from '../core/infra/Mapper';
import { Document, Model } from 'mongoose';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import IPackagingDTO from '../dto/Packaging/IPackagingDTO';
import { IPackagingPersistence } from '../persistence/dataschema/IPackagingPersistence';

export class PackagingMap extends Mapper<Packaging> {
  public static toDTO(packaging: Packaging): IPackagingDTO {
    return {
      packagingId: packaging.packagingId.value,
      packagingX: packaging.packagingX,
      packagingY: packaging.packagingY,
      packagingZ: packaging.packagingZ,
      packagingTruck: packaging.packagingTruck,
    } as IPackagingDTO;
  }

  public static toDomain(packaging: any | Model<IPackagingPersistence & Document>): Packaging {
    const packagingOrError = Packaging.create(packaging, new UniqueEntityID(packaging.domainId));

    packagingOrError.isFailure ? console.log(packagingOrError.error) : '';

    return packagingOrError.isSuccess ? packagingOrError.getValue() : null;
  }

  public static toPersistence(packaging: Packaging): any {
    const pack = {
      packagingId: packaging.packagingId.value,
      packagingX: packaging.packagingX,
      packagingY: packaging.packagingY,
      packagingZ: packaging.packagingZ,
      packagingTruck: packaging.packagingTruck,
    };
    return pack;
  }
}
