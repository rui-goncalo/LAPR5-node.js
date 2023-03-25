import IPackagingService from './IServices/IPackagingService';
import { Inject, Service } from 'typedi';
import IPackagingDTO from '../dto/Packaging/IPackagingDTO';
import { Result } from '../core/logic/Result';
import { Packaging } from '../domain/Packaging/packaging';
import config from '../../config';
import IPackagingRepo from '../repos/IRepos/IPackagingRepo';
import { PackagingMap } from '../mappers/packagingMap';

@Service()
export default class PackagingService implements IPackagingService {
  constructor(@Inject(config.repos.packaging.name) private packagingRepo: IPackagingRepo) {}

  async createPackaging(packagingId: string, packagingDTO: IPackagingDTO): Promise<Result<IPackagingDTO>> {
    try {
      const packaging = await this.packagingRepo.findByPackagingId(packagingDTO.packagingId);

      if (packaging != null) {
        return Result.fail<IPackagingDTO>('Packaging already exists: ' + packagingDTO.packagingId);
      }

      const packagingOrError = await Packaging.create(packagingDTO);

      if (packagingOrError.isFailure) {
        return Result.fail<IPackagingDTO>(packagingOrError.errorValue());
      }
      const packagingRes = packagingOrError.getValue();
      await this.packagingRepo.save(packagingRes);

      const packDTORes = PackagingMap.toDTO(packagingRes) as IPackagingDTO;
      return Result.ok<IPackagingDTO>(packDTORes);
    } catch (e) {
      throw e;
    }
  }

  async getAllPackagings(): Promise<Result<IPackagingDTO[]>> {
    try {
      let packagings = await this.packagingRepo.getAllPackagings();

      if (packagings == null) {
        return Result.fail('No packagings available.');
      }
      const packDTORes = packagings.map(item => PackagingMap.toDTO(item));

      return Result.ok<IPackagingDTO[]>(packDTORes);
    } catch (e) {
      throw e;
    }
  }

  async getPackagingById(packagingId: string): Promise<Result<IPackagingDTO>> {
    try {
      let getPackaging = await this.packagingRepo.findByPackagingId(packagingId);

      if (getPackaging == null) {
        return Result.fail('No packaging ID available.');
      }

      const packDTORes = PackagingMap.toDTO(getPackaging) as IPackagingDTO;
      return Result.ok<IPackagingDTO>(packDTORes);
    } catch (e) {
      throw e;
    }
  }

  async deletePackaging(packagingId: string): Promise<Result<boolean>> {
    try {
      const exists = await this.packagingRepo.findByPackagingId(packagingId);

      if (!exists) {
        return Result.fail(false);
      }

      await this.packagingRepo.delete(packagingId);
      return Result.ok(true);
    } catch (e) {
      throw e;
    }
  }

  async updatePackaging(packagingDTO: IPackagingDTO): Promise<Result<IPackagingDTO>> {
    try {
      const exists = await this.packagingRepo.findByPackagingId(packagingDTO.packagingId);

      if (!exists) {
        return Result.fail<IPackagingDTO>('Packaging not found.');
      }

      const updatedPackaging = await this.packagingRepo.update(PackagingMap.toDomain(packagingDTO));
      const packagingDTOResult = PackagingMap.toDTO(updatedPackaging) as IPackagingDTO;
      return Result.ok<IPackagingDTO>(packagingDTOResult);
    } catch (e) {
      throw e;
    }
  }
}
