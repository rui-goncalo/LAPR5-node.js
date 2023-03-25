import {Result} from "../../../../src/core/logic/Result";
import {PlanningRoute} from "../../../../src/domain/PlanningRoute/planningRoute";

describe('Domain/PlanningRoute', () => {
    test("Doesn't create a PlanningRoute without RouteId", () => {
        expect(
            PlanningRoute.create({
                planningRouteId: '',
                date: '20221205',
                truckId: '1',
                planningRoute: ['1','3','5','7','9']
            }),
        ).toStrictEqual(Result.fail<PlanningRoute>('Error planning route.'));
    });

    test("Doesn't create a PlanningRoute without Date", () => {
        expect(
            PlanningRoute.create({
                planningRouteId: '1',
                date: '',
                truckId: '1',
                planningRoute: ['1','3','5','7','9']
            }),
        ).toStrictEqual(Result.fail<PlanningRoute>('Error planning route.'));
    });

    test("Doesn't create a PlanningRoute without TruckId", () => {
        expect(
            PlanningRoute.create({
                planningRouteId: '1',
                date: '20221205',
                truckId: '',
                planningRoute: ['1','3','5','7','9']
            }),
        ).toStrictEqual(Result.fail<PlanningRoute>('Error planning route.'));
    });

    test("Doesn't create a PlanningRoute without PlanningRoute", () => {
        expect(
            PlanningRoute.create({
                planningRouteId: '',
                date: '20221205',
                truckId: '1',
                planningRoute: []
            }),
        ).toStrictEqual(Result.fail<PlanningRoute>('Error planning route.'));
    });
});