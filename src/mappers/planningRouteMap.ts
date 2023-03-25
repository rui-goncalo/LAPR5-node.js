import { Service,Container, Inject, Token} from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Document, Model } from 'mongoose';
import {PlanningRoute} from "../domain/PlanningRoute/planningRoute";
import IPlanningRouteDTO from "../dto/PlanningRoute/IPlanningRouteDTO";
import {IPlanningRoutePersistence} from "../persistence/dataschema/IPlanningRoutePersistence";


export class PlanningRouteMap extends Mapper<PlanningRoute> {

    public static toDTO(plan: PlanningRoute): IPlanningRouteDTO {
        // @ts-ignore
        return {
            planningRouteId: plan.props.planningRouteId.toString(),
            // @ts-ignore
            data: plan.props.data,
            truckId: plan.props.truckId,
            planningRoute: plan.props.planningRoute
        } as IPlanningRouteDTO;
    }

    public static toDomain(raw: any | Model<IPlanningRoutePersistence & Document>): PlanningRoute {
        const routeOrError = PlanningRoute.create(raw, new UniqueEntityID(raw.domainId));

        const TruckOrError = PlanningRoute.create({
            planningRouteId: raw.planningRouteId,
            truckId: raw.truckId,
            // @ts-ignore
            data: raw.data,
            planningRoute: raw.planningRoute,
        }, new UniqueEntityID(raw.registration))

        TruckOrError.isFailure ? console.log(TruckOrError.error) : 'Error in toDomain';

        return routeOrError.isSuccess ? routeOrError.getValue() : null;
    }


    public static toPersistence (plan: PlanningRoute): any {
        return  {
            domainId: plan.id.toString(),
            planningRouteId: plan.props.planningRouteId,
            truckId: plan.props.truckId,
            // @ts-ignore
            data: plan.props.data,
            planningRoute: plan.props.planningRoute
        }
    }
}