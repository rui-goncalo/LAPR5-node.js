import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface RegistrationProps {
  registration: string;
}

export class TruckRegistration extends ValueObject<RegistrationProps> {
  get registration(): string {
    return this.props.registration;
  }

  public constructor(props: RegistrationProps) {
    super(props);
  }

  public static create(props: RegistrationProps): Result<TruckRegistration> {
    const regex = new RegExp(/^(([A-Z]{2}-\d{2}-(\d{2}|[A-Z]{2}))|(\d{2}-(\d{2}-[A-Z]{2}|[A-Z]{2}-\d{2})))$/);

    if (regex.test(props.registration)) {
      return Result.ok<TruckRegistration>(
        new TruckRegistration({
          registration: props.registration,
        }),
      );
    }
    return Result.fail<TruckRegistration>('Registration is not valid!');
  }
}
