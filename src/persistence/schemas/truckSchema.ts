import { ITruckPersistence } from '../dataschema/ITruckPersistence';
import mongoose from 'mongoose';

const TruckSchema = new mongoose.Schema(
  {
    truckId: {
      type: String,
      unique: true,
    },

    registration: {
      type: String,
      index: true,
    },

    batteryCap: {
      type: String,
      index: true,
    },

    electricRange: {
      type: String,
      index: true,
    },

    maxBatteryCap: {
      type: String,
      index: true,
    },

    chargeTime: {
      type: String,
      index: true,
    },

    tareWeight: {
      type: String,
      index: true,
    },

    isActive: {
      type: String,
      index: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<ITruckPersistence & mongoose.Document>('Truck', TruckSchema);
