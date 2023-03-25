import { TruckId } from '../Truck/truckId';
import { PackagingId } from './packagingId';
import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import IPackagingDTO from '../../dto/Packaging/IPackagingDTO';
import { Result } from '../../core/logic/Result';

interface PackagingProps {
  packagingId: PackagingId;
  packagingX: string;
  packagingY: string;
  packagingZ: string;
  packagingTruck: string; //TODO: Verificar se não deveria ser TruckId
}

export class Packaging extends AggregateRoot<PackagingProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get packagingId(): PackagingId {
    return this.props.packagingId;
  }

  get packagingX(): string {
    return this.props.packagingX;
  }

  get packagingY(): string {
    return this.props.packagingY;
  }

  get packagingZ(): string {
    return this.props.packagingZ;
  }

  get packagingTruck(): string {
    return this.props.packagingTruck;
  }

  private constructor(props: PackagingProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(packagingDTO: IPackagingDTO, id?: UniqueEntityID): Result<Packaging> {
    const packagingId = packagingDTO.packagingId;
    const packagingX = packagingDTO.packagingX;
    const packagingY = packagingDTO.packagingY;
    const packagingZ = packagingDTO.packagingZ;
    const packagingTruck = packagingDTO.packagingTruck;

    if (packagingId === undefined || packagingId.length === 0) {
      return Result.fail<Packaging>('PackagingID is required.');
    } else {
      // @ts-ignore
      if (packagingX < 0 || packagingX > 10) {
        return Result.fail<Packaging>('PackagingX is not valid.');
        // @ts-ignore
      } else if (packagingY < 0 || packagingY > 20) {
        return Result.fail<Packaging>('PackagingY is not valid.');
        // @ts-ignore
      } else if (packagingZ < 0 || packagingZ > 8) {
        return Result.fail<Packaging>('PackagingZ is not valid.');
      } else if (packagingTruck === undefined || packagingTruck.length === 0) {
        return Result.fail<Packaging>('PackagingTruck is not valid.');
      } else {
        const packaging = new Packaging(
          {
            packagingId: PackagingId.create(packagingId).getValue(),
            packagingX: packagingX,
            packagingY: packagingY,
            packagingZ: packagingZ,
            packagingTruck: packagingTruck,
          },
          id,
        );
        return Result.ok<Packaging>(packaging);
      }
    }
  }
}
