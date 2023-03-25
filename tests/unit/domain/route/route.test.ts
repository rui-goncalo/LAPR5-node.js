import { Route } from '../../../../src/domain/Route/route';
import { Result } from '../../../../src/core/logic/Result';
import { RouteDistance } from '../../../../src/domain/Route/routeDistance';

describe('Domain/Route', () => {
  test("Doesn't create a Route without RouteId", () => {
    expect(
      Route.create({
        routeId: '',
        origin: '1',
        destination: '2',
        distance: '300.00',
        timeDistance: '30:00',
        energySpent: '150',
        extraTimeBattery: '30:00',
      }),
    ).toStrictEqual(Result.fail<Route>('RouteId is required.'));
  });

  test("Doesn't create a Route without origin", () => {
    expect(
      Route.create({
        routeId: '1',
        origin: '',
        destination: '2',
        distance: '300.00',
        timeDistance: '30:00',
        energySpent: '150',
        extraTimeBattery: '30:00',
      }),
    ).toStrictEqual(Result.fail<Route>('Origin is required.'));
  });

  test("Doesn't create a Route without destination", () => {
    expect(
      Route.create({
        routeId: '1',
        origin: '1',
        destination: '',
        distance: '300.00',
        timeDistance: '30:00',
        energySpent: '150',
        extraTimeBattery: '30:00',
      }),
    ).toStrictEqual(Result.fail<Route>('Destination is required.'));
  });

  test("Doesn't create a Route with an invalid distance", () => {
    expect(
      Route.create({
        routeId: '1',
        origin: '1',
        destination: '2',
        distance: '',
        timeDistance: '30:00',
        energySpent: '150',
        extraTimeBattery: '30:00',
      }),
    ).toStrictEqual(Result.fail<RouteDistance>('Distance is required.'));
  });

  test("Doesn't create a Route with an invalid timeDistance", () => {
    expect(
      Route.create({
        routeId: '1',
        origin: '1',
        destination: '2',
        distance: '150',
        timeDistance: '',
        energySpent: '150',
        extraTimeBattery: '30:00',
      }),
    ).toStrictEqual(Result.fail<RouteDistance>('TimeDistance is required.'));
  });

  test("Doesn't create a Route with an invalid energySpent", () => {
    expect(
      Route.create({
        routeId: '1',
        origin: '1',
        destination: '2',
        distance: '150',
        timeDistance: '30:00',
        energySpent: '',
        extraTimeBattery: '30:00',
      }),
    ).toStrictEqual(Result.fail<RouteDistance>('EnergySpent is required.'));
  });

  test("Doesn't create a Route with an invalid extraTimeBattery", () => {
    expect(
      Route.create({
        routeId: '1',
        origin: '1',
        destination: '2',
        distance: '150',
        timeDistance: '30:00',
        energySpent: '150',
        extraTimeBattery: '',
      }),
    ).toStrictEqual(Result.fail<RouteDistance>('ExtraTimeBattery is required.'));
  });
});
