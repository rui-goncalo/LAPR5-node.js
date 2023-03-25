import IPackagingDTO from '../../dto/Packaging/IPackagingDTO';
import { Result } from '../../core/logic/Result';
import ITripDTO from '../../dto/Trip/ITripDTO';

export default interface IPackagingService {
  createPackaging(packagingId: string, packagingDTO: IPackagingDTO): Promise<Result<IPackagingDTO>>;
  getPackagingById(packagingId: string): Promise<Result<IPackagingDTO>>;
  getAllPackagings(): Promise<Result<IPackagingDTO[]>>;
  updatePackaging(packagingDTO: IPackagingDTO): Promise<Result<IPackagingDTO>>;
  deletePackaging(packagingId: string): Promise<Result<boolean>>;
}
