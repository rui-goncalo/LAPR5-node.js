import ITripDTO from '../../dto/Trip/ITripDTO';
import { Result } from '../../core/logic/Result';

export default interface ITripService {
  createTrip(tripId: string, tripDTO: ITripDTO): Promise<Result<ITripDTO>>;
  getTripById(tripId: string): Promise<Result<ITripDTO>>;
  getAllTrips(): Promise<Result<ITripDTO[]>>;
  updateTrip(tripDTO: ITripDTO): Promise<Result<ITripDTO>>;
  deleteTrip(tripId: string): Promise<Result<boolean>>;
}
