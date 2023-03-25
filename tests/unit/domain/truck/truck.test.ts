import { Truck } from '../../../../src/domain/Truck/truck';
import { Result } from '../../../../src/core/logic/Result';

describe('Domain/Truck', () => {
  test("Doesn't create a Truck without TruckId", () => {
    expect(
      Truck.create({
        truckId: '',
        registration: '40-KH-57',
        batteryCap: '79799',
        maxBatteryCap: '7777',
        electricRange: '444',
        chargeTime: '20:20',
        tareWeight: '77.777',
        isActive: 'true'
      }),
    ).toStrictEqual(Result.fail<Truck>('Truck ID is required!'));
  });

  test("Doesn't create a Truck without Registration", () => {
    expect(
      Truck.create({
        truckId: '1',
        registration: '',
        batteryCap: '79799',
        maxBatteryCap: '7777',
        electricRange: '444',
        chargeTime: '20:20',
        tareWeight: '77.777',
        isActive: 'true'
      }),
    ).toStrictEqual(Result.fail<Truck>('Registration is required!'));
  });

  test("Doesn't create a Truck without BatteryCap", () => {
    expect(
      Truck.create({
        truckId: '1',
        registration: '40-KH-57',
        batteryCap: '',
        maxBatteryCap: '7777',
        electricRange: '444',
        chargeTime: '20:20',
        tareWeight: '77.777',
        isActive: 'true'
      }),
    ).toStrictEqual(Result.fail<Truck>('BatteryCap is required!'));
  });

  test("Doesn't create a Truck without MaxBatteryCap", () => {
    expect(
      Truck.create({
        truckId: '1',
        registration: '40-KH-57',
        batteryCap: '79799',
        maxBatteryCap: '',
        electricRange: '444',
        chargeTime: '20:20',
        tareWeight: '77.777',
        isActive: 'true'
      }),
    ).toStrictEqual(Result.fail<Truck>('MaxBatteryCap is required!'));
  });

  test("Doesn't create a Truck without ElectricRange", () => {
    expect(
      Truck.create({
        truckId: '1',
        registration: '40-KH-57',
        batteryCap: '79799',
        maxBatteryCap: '7777',
        electricRange: '',
        chargeTime: '20:20',
        tareWeight: '77.777',
        isActive: 'true'
      }),
    ).toStrictEqual(Result.fail<Truck>('ElectricRange is required!'));
  });

  test("Doesn't create a Truck without ChargeTime", () => {
    expect(
      Truck.create({
        truckId: '1',
        registration: '40-KH-57',
        batteryCap: '79799',
        maxBatteryCap: '7777',
        electricRange: '',
        chargeTime: '20:20',
        tareWeight: '77.777',
        isActive: 'true'
      }),
    ).toStrictEqual(Result.fail<Truck>('ElectricRange is required!'));
  });

  test("Doesn't create a Truck without TareWeight", () => {
    expect(
      Truck.create({
        truckId: '1',
        registration: '40-KH-57',
        batteryCap: '79799',
        maxBatteryCap: '7777',
        electricRange: '444',
        chargeTime: '20:20',
        tareWeight: '',
        isActive: 'true'
      }),
    ).toStrictEqual(Result.fail<Truck>('TareWeight is required!'));
  });
});
