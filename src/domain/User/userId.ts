import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface userIdProps {
  value: string;
}

export class UserId extends ValueObject<userIdProps> {

  get value (): string {
    return this.props.value;
  }

  private constructor(props: userIdProps) {
    super(props);
  }

  public static create(id: string): Result<UserId> {
    const guardResult = Guard.againstNullOrUndefined(id, 'id');

    if (!guardResult.succeeded) {
      return Result.fail<UserId>(guardResult.message);
    } else {
      return Result.ok<UserId>(new UserId({ value: id }));
    }
  }
}