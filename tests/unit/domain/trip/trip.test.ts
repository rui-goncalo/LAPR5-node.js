import { Result } from '../../../../src/core/logic/Result';
import { Trip } from '../../../../src/domain/Trip/trip';

describe('Domain/Trip', () => {
  test("Doesn't create a Trip without tripId", () => {
    expect(
      Trip.create({
        tripId: '',
        tripRoutes: null,
      }),
    ).toStrictEqual(Result.fail<Trip>('TripID is required.'));
  });
});
