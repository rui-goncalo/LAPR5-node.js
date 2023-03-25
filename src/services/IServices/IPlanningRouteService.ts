import {Result} from "../../core/logic/Result";

export default interface IPlanningRouteService {
    getBestRoute(date: string, truckId: string): Promise<Result<{viagemR: string[]}>>;
    getHDist(date: string, truckId: string): Promise<Result<{viagemR: string[]}>>;
    getHMassa(date: string, truckId: string): Promise<Result<{viagemR: string[]}>>;
    getHMassaTempo(date: string, truckId: string): Promise<Result<{viagemR: string[]}>>;
    getAlgGen(date: string, truckId: string): Promise<Result<{viagemR: string[]}>>;
}