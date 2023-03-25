import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface BatteryCapProps {
    batteryCap: string;
}

export class TruckBatteryCapacity extends ValueObject<BatteryCapProps> {
    get batteryCap(): string {
        return this.props.batteryCap;
    }

    public constructor (props: BatteryCapProps) {
        super(props);
    }

    public static create (props: BatteryCapProps): Result<TruckBatteryCapacity> {
        return Result.ok<TruckBatteryCapacity>
        (new TruckBatteryCapacity({
            batteryCap: props.batteryCap, 
        }));
    }
}