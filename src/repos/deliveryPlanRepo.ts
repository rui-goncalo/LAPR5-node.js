import { Inject, Service } from 'typedi';
import IDeliveryPlanRepo from './IRepos/IDeliveryPlanRepo';
import { IDeliveryPlanPersistence } from '../persistence/dataschema/IDeliveryPlanPersistence';
import { Document, FilterQuery, Model } from 'mongoose';
import { DeliveryPlanId } from '../domain/DeliveryPlan/deliveryPlanId';
import { DeliveryPlan } from '../domain/DeliveryPlan/deliveryPlan';
import { DeliveryPlanDeliveries } from '../domain/DeliveryPlan/deliveryPlanDeliveries';
import { DeliveryPlanMap } from '../mappers/deliveryPlanMap';
import { ITripPersistence } from '../persistence/dataschema/ITripPersistence';
import { TripMap } from '../mappers/TripMap';

@Service()
export default class DeliveryPlanRepo implements IDeliveryPlanRepo {
  private models: any;

  constructor(@Inject('deliveryPlanSchema') private deliveryPlanSchema: Model<IDeliveryPlanPersistence & Document>) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  // @ts-ignore
  public async exists(deliveryPlanId: DeliveryPlanId | string): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-angle-bracket-type-assertion
    const idX = deliveryPlanId instanceof DeliveryPlanId ? (<DeliveryPlanId>deliveryPlanId).value : deliveryPlanId;

    const query = { dpId: idX };
    const userDocument = await this.deliveryPlanSchema.findOne(query);

    return !!userDocument === true;
  }

  public async save(deliveryPlan: DeliveryPlan): Promise<DeliveryPlan> {
    const query = { deliveryPlanId: deliveryPlan.deliveryPlanId.value };

    const deliveryPlanDoc = await this.deliveryPlanSchema.findOne(query);

    try {
      if (deliveryPlanDoc === null) {
        const rawDP: any = DeliveryPlanMap.toPersistence(deliveryPlan);
        const dpCreated = await this.deliveryPlanSchema.create(rawDP);

        return DeliveryPlanMap.toDomain(dpCreated);
      } else {
        deliveryPlanDoc.deliveryPlanId = deliveryPlan.deliveryPlanId.value;
        deliveryPlanDoc.deliveryPlanDeliveries = deliveryPlan.deliveryPlanDeliveries.value;

        await deliveryPlanDoc.save();

        return deliveryPlan;
      }
    } catch (err) {
      throw err;
    }
  }

  async findByDeliveryPlanId(deliveryPlanId: string): Promise<DeliveryPlan> {
    const query = { deliveryPlanId: deliveryPlanId };
    const dpRecord = await this.deliveryPlanSchema.findOne(query as FilterQuery<IDeliveryPlanPersistence & Document>);

    if (dpRecord != null) {
      return DeliveryPlanMap.toDomain(dpRecord);
    } else return null;
  }

  async getAllDeliveryPlans(): Promise<DeliveryPlan[]> {
    const dpArray = await this.deliveryPlanSchema.find();

    return dpArray.map(item => DeliveryPlanMap.toDomain(item));
  }

  // @ts-ignore
  async delete(deliveryPlanId: DeliveryPlanId | string) {
    const query = { deliveryPlanId: deliveryPlanId };
    await this.deliveryPlanSchema.deleteOne(query as FilterQuery<IDeliveryPlanPersistence & Document>);
  }

  async update(deliveryPlan: DeliveryPlan): Promise<DeliveryPlan> {
    // @ts-ignore
    await this.deliveryPlanSchema.updateOne(
      { deliveryPlanId: deliveryPlan.deliveryPlanId.value },
      // @ts-ignore
      DeliveryPlanMap.toDTO(deliveryPlan),
    );
    // verify here if the update was successful, else throw excp
    const updatedDP = await this.deliveryPlanSchema.findOne({ deliveryPlanId: deliveryPlan.deliveryPlanId.value });

    return DeliveryPlanMap.toDomain(updatedDP);
  }
}
