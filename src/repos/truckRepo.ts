import { Service, Inject } from 'typedi';
import ITruckRepo from './IRepos/ITruckRepo';
import { Truck } from '../domain/Truck/truck';
import { TruckId } from '../domain/Truck/truckId';
import { TruckMap } from '../mappers/TruckMap';
import { Document, FilterQuery, Model } from 'mongoose';
import { ITruckPersistence } from '../persistence/dataschema/ITruckPersistence';

@Service()
export default class TruckRepo implements ITruckRepo {
  constructor(@Inject('truckSchema') private truckSchema: Model<ITruckPersistence & Document>) {}

  // @ts-ignore
  public async exists(truckId: TruckId | string): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-angle-bracket-type-assertion
    const idX = truckId instanceof TruckId ? (<TruckId>truckId).value : truckId;

    const query = { domainId: idX };
    const truckDocument = await this.truckSchema.findOne(query);

    return !!truckDocument === true;
  }

  public async save(truck: Truck): Promise<Truck> {
    const query = { truckId: truck.truckId.value };

    const truckDocument = await this.truckSchema.findOne(query);

    try {
      if (truckDocument === null) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rawTruck: any = TruckMap.toPersistence(truck);
        console.log(rawTruck);
        const truckCreated = await this.truckSchema.create(rawTruck);

        return TruckMap.toDomain(truckCreated);
      } else {
        truckDocument.truckId = truck.truckId.value;
        truckDocument.registration = truck.registration.registration;
        truckDocument.batteryCap = truck.batteryCap.batteryCap;
        truckDocument.electricRange = truck.electricRange.electricRange;
        truckDocument.maxBatteryCap = truck.maxBatteryCap.maxBatteryCap;
        truckDocument.chargeTime = truck.chargeTime.chargeTime;
        truckDocument.tareWeight = truck.tareWeight.tareWeight;

        await truckDocument.save();
        return truck;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public async findById(truckId: TruckId | string): Promise<Truck> {
    const query = { truckId: truckId };
    const truckRecord = await this.truckSchema.findOne(query as FilterQuery<ITruckPersistence & Document>);

    if (truckRecord != null) {
      return TruckMap.toDomain(truckRecord);
    } else return null;
  }

  public async findAllTrucks(): Promise<Truck[]> {
    const arr = await this.truckSchema.find();
    return arr.map(item => TruckMap.toDomain(item));
  }

  async update(truck: Truck): Promise<Truck> {
    // @ts-ignore
    await this.truckSchema.updateOne({ truckId: truck.truckId.value }, TruckMap.toDTO(truck));
    // verify here if the update was successful, else throw excp
    const updatedTruck = await this.truckSchema.findOne({ truckId: truck.truckId.value });

    return TruckMap.toDomain(updatedTruck);
  }

  async delete(truckId: TruckId | string) {
    const query = { truckId: truckId };
    await this.truckSchema.deleteOne(query as FilterQuery<ITruckPersistence & Document>);
  }
}
