import {Repo} from "../../core/infra/Repo";
import {PlanningRoute} from "../../domain/PlanningRoute/planningRoute";

export default interface IPlanningRouteRepo extends Repo<PlanningRoute> {
    getBestRoute(date: string, truckId: string): Promise<{viagemR: string[]}>;
    getHDist(date: string, truckId: string): Promise<{viagemR: string[]}>;
    getHMassa(date: string, truckId: string): Promise<{viagemR: string[]}>;
    getHMassaTempo(date: string, truckId: string): Promise<{viagemR: string[]}>;
    getAlgGen(date: string, truckId: string): Promise<{viagemR: string[]}>;
}