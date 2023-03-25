import mongoose from "mongoose";
import {IPlanningRoutePersistence} from "../dataschema/IPlanningRoutePersistence";

const PlanningRoute = new mongoose.Schema( {
    planningRouteId: {
        type: String,
        unique: true,
    },

    data: {
        type: String,
        index: true,
    },

    truckId: {
        type: String,
        index: true,
    },

    planningRoute: {
        type: Array,
        items: {
            type: String
        },
        index: true,
    },
}, {timestamps: true},
);

export default mongoose.model<IPlanningRoutePersistence & mongoose.Document>('PlanningRoute', PlanningRoute);
