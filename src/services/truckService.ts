import { Service, Inject } from 'typedi';
import config from '../../config';
import ITruckDTO from '../dto/Truck/ITruckDTO';
import { Truck } from '../domain/Truck/truck';
import ITruckService from './IServices/ITruckService';
import { Result } from '../core/logic/Result';
import ITruckRepo from '../repos/IRepos/ITruckRepo';
import { TruckMap } from '../mappers/TruckMap';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';


@Service()
export default class TruckService implements ITruckService {
  constructor(@Inject(config.repos.truck.name) private truckRepo: ITruckRepo) {}

  async getTruckById(truckId: string): Promise<Result<ITruckDTO>> {
    try {
      let truck = await this.truckRepo.findById(truckId);

      if (truck === null) {
        return Result.fail<ITruckDTO>('Truck not found');
      } else {
        const truckDTOResult = TruckMap.toDTO(truck) as ITruckDTO;
        return Result.ok<ITruckDTO>(truckDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async getAllTrucks(): Promise<Result<ITruckDTO[]>> {
    try {
      let trucks = await this.truckRepo.findAllTrucks();

      if (trucks == null) {
        return Result.fail("There's no trucks available'");
      }

      const truckDTOres = trucks.map(item => TruckMap.toDTO(item));
      return Result.ok<ITruckDTO[]>(truckDTOres);
    } catch (e) {
      throw e;
    }
  }

  async createTruck(truckId: string, truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    try {
      const truckId = await this.truckRepo.findById(truckDTO.truckId);

      if (truckId != null) {
        return Result.fail<ITruckDTO>('Truck already exists: ' + truckDTO.truckId);
      }

      const truckOrError = await Truck.create(truckDTO);

      if (truckOrError.isFailure) {
        return Result.fail<ITruckDTO>(truckOrError.errorValue());
      }

      const truckResult = truckOrError.getValue();

      await this.truckRepo.save(truckResult);

      const truckDTOResult = TruckMap.toDTO(truckResult) as ITruckDTO;
      return Result.ok<ITruckDTO>(truckDTOResult);
    } catch (e) {
      throw e;
    }
  }

  async updateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    try {
      const exists = await this.truckRepo.findById(truckDTO.truckId);

      if (!exists) {
        return Result.fail<ITruckDTO>('Truck not found.');
      }

      const updatedTruck = await this.truckRepo.update(TruckMap.toDomain(truckDTO));
      const truckDTOResult = TruckMap.toDTO(updatedTruck) as ITruckDTO;
      return Result.ok<ITruckDTO>(truckDTOResult);
    } catch (e) {
      throw e;
    }
  }

  async inactivateAsync(truckId: string): Promise<Result<ITruckDTO>> {
    try {
      let truck = await this.truckRepo.findById(truckId);

      if (truck === null) {
        return Result.fail<ITruckDTO>('Truck not found');
      } else {
        truck.isActive = 'false';
        const updatedTruck = await this.truckRepo.update(truck);
        const truckDTOResult = TruckMap.toDTO(updatedTruck) as ITruckDTO;
        return Result.ok<ITruckDTO>(truckDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  async activateAsync(truckId: string): Promise<Result<ITruckDTO>> {
    try {
      let truck = await this.truckRepo.findById(truckId);

      if (truck === null) {
        return Result.fail<ITruckDTO>('Truck not found');
      } else {

        truck.isActive = 'true';
        const updatedTruck = await this.truckRepo.update(truck);
        const truckDTOResult = TruckMap.toDTO(updatedTruck) as ITruckDTO;
        return Result.ok<ITruckDTO>(truckDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  async checkActivateAsync(truckId: string): Promise<Result<boolean>> {
    try {
      let truck = await this.truckRepo.findById(truckId);

      if(truck.isActive === 'true'){
        return Result.ok<boolean>(true);
      } else {
        return Result.ok<boolean>(false);
      }
    } catch (e) {
      throw e;
    }
  }

  async deleteTruck(truckId: string): Promise<Result<boolean>> {
    try {
      const exists = await this.truckRepo.findById(truckId);

      if (!exists) {
        return Result.fail(false);
      }

      await this.truckRepo.delete(truckId);
      return Result.ok(true);
    } catch (e) {
      throw e;
    }
  }
}
