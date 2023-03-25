import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface PlanningRouteIdProps {
    planningRouteId: string;
}

export class PlanningRouteId extends ValueObject<PlanningRouteIdProps> {
    get planningRouteId(): string {
        return this.props.planningRouteId;
    }

    private constructor(props: PlanningRouteIdProps) {
        super(props);
    }

    public static create(id: string): Result<PlanningRouteId> {
        const guardResult = Guard.againstNullOrUndefined(id, 'id');

        if (!guardResult.succeeded) {
            return Result.fail<PlanningRouteId>(guardResult.message);
        } else {
            return Result.ok<PlanningRouteId>(new PlanningRouteId({ planningRouteId: id }));
        }
    }
}
