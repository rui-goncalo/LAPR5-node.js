import {AggregateRoot} from "../../core/domain/AggregateRoot";
import {PlanningRouteId} from "./planningRouteId";
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";
import {Result} from "../../core/logic/Result";
import IPlanningRouteDTO from "../../dto/PlanningRoute/IPlanningRouteDTO";

interface PlanningRouteProps {
    planningRouteId: PlanningRouteId;
    date: string;
    truckId: string;
    planningRoute: string[];
}

export class PlanningRoute extends AggregateRoot<PlanningRouteProps> {
    get id(): UniqueEntityID {
        return this._id;
    }
    get planningRouteId(): PlanningRouteId {
        return this.props.planningRouteId;
    }

    get date(): string {
        return this.props.date;
    }

    get truckId(): string {
        return this.props.truckId;
    }

    get planningRoute(): string[] {
        return this.props.planningRoute;
    }

    private constructor(props: PlanningRouteProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(planningRouteDTO: IPlanningRouteDTO, id?: UniqueEntityID): Result<PlanningRoute> {
        try {
            const planningRouteId = planningRouteDTO.planningRouteId;
            const date = planningRouteDTO.date;
            const truckId = planningRouteDTO.truckId;
            const planningRoute = planningRouteDTO.planningRoute;

            if (planningRouteId === undefined || planningRouteId.length === 0 ||
                date === undefined || date.length === 0 ||
                truckId === undefined || truckId.length === 0 ||
                planningRoute === undefined || planningRoute.length === 0) {
                return Result.fail<PlanningRoute>('Error planning route.');
            } else {
                const planningRoutes = new PlanningRoute({planningRouteId: PlanningRouteId.create(planningRouteId).getValue(), date: date, truckId: truckId, planningRoute: planningRoute })
                return Result.ok<PlanningRoute>(planningRoutes);
            }
        } catch (e) {
            return Result.fail<PlanningRoute>('Error while creating Planning Route');
        }
    }
}