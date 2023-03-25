import mongoose from 'mongoose';
import { IPackagingPersistence } from '../dataschema/IPackagingPersistence';

const Packaging = new mongoose.Schema(
  {
    packagingId: {
      type: String,
      unique: true,
    },

    packagingX: {
      type: String,
      index: true,
    },

    packagingY: {
      type: String,
      index: true,
    },

    packagingZ: {
      type: String,
      index: true,
    },

    packagingTruck: {
      type: String,
      index: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IPackagingPersistence & mongoose.Document>('Packaging', Packaging);
