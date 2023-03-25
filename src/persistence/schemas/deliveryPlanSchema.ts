import mongoose from 'mongoose';
import { IDeliveryPlanPersistence } from '../dataschema/IDeliveryPlanPersistence';

const DeliveryPlan = new mongoose.Schema(
  {
    deliveryPlanId: {
      type: String,
      unique: true,
    },

    deliveryPlanDeliveries: [String],
  },
  { timestamps: true },
);

export default mongoose.model<IDeliveryPlanPersistence & mongoose.Document>('DeliveryPlan', DeliveryPlan);
