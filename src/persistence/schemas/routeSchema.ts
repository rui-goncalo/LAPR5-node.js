import mongoose from 'mongoose';
import { IRoutePersistence } from '../dataschema/IRoutePersistence';

const Route = new mongoose.Schema(
  {
    routeId: {
      type: String,
      unique: true,
    },

    origin: {
      type: String,
      index: true,
    },

    destination: {
      type: String,
      index: true,
    },

    distance: {
      type: String,
      index: true,
    },

    timeDistance: {
      type: String,
      index: true,
    },

    energySpent: {
      type: String,
      index: true,
    },

    extraTimeBattery: {
      type: String,
      index: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IRoutePersistence & mongoose.Document>('Route', Route);
