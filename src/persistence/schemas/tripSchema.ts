import mongoose from 'mongoose';
import { ITripPersistence } from '../dataschema/ITripPersistence';

const Trip = new mongoose.Schema(
  {
    tripId: {
      type: String,
      unique: true,
    },

    tripRoutes: {
      type: String,
      index: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<ITripPersistence & mongoose.Document>('Trip', Trip);
