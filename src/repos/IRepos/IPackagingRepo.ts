import { Packaging } from '../../domain/Packaging/packaging';
import { Repo } from '../../core/infra/Repo';
import { PackagingId } from '../../domain/Packaging/packagingId';
import { Trip } from '../../domain/Trip/trip';
import { TripId } from '../../domain/Trip/tripId';
import { PackagingMap } from '../../mappers/packagingMap';

export default interface IPackagingRepo extends Repo<Packaging> {
  save(packaging: Packaging): Promise<Packaging>;
  findByPackagingId(packagingId: PackagingId | string): Promise<Packaging>;
  getAllPackagings(): Promise<Packaging[]>;
  update(packaging: Packaging): Promise<Packaging>;
  delete(packagingId: PackagingId | string): void;
}
