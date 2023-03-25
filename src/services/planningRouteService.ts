import {Inject, Service} from "typedi";
import IPlanningRouteService from "./IServices/IPlanningRouteService";
import config from "../../config";
import {Result} from "../core/logic/Result";
import IPlanningRouteRepo from "../repos/IRepos/IPlanningRouteRepo";

@Service()
export default class PlanningRouteService implements IPlanningRouteService {
    constructor(@Inject(config.repos.planningRoute.name) private planningRouteRepo: IPlanningRouteRepo) {}

    /*async createPlanningRoute(planningRouteId: string, planningRouteDTO: IPlanningRouteDTO): Promise<Result<IPlanningRouteDTO>> {
        try {
            const planningRoute = await this.planningRouteRepo.findByPlanningRouteId(planningRouteDTO.planningRouteId);

            if (planningRoute != null) {
                return Result.fail<IPlanningRouteDTO>('Planning Route already exists: ' + planningRouteDTO.planningRouteId);
            }

            const PROrError = await PlanningRoute.create(planningRouteDTO);

            if (PROrError.isFailure) {
                return Result.fail<IPlanningRouteDTO>(PROrError.errorValue());
            }
            const PRResult = PROrError.getValue();

            await this.planningRouteRepo.save(PRResult);

            const PRDTOResult = PlanningRouteMap.toDTO(PRResult) as IPlanningRouteDTO;
            return Result.ok<IPlanningRouteDTO>(PRDTOResult);
        } catch (e) {
            throw e;
        }
    }*/

    public async getBestRoute(date: string, truckId: string): Promise<Result<{viagemR: string[]}>> {
        try {
            const bestRoute = await this.planningRouteRepo.getBestRoute(date, truckId);

            return Result.ok<{viagemR: string[]}>(bestRoute);
        } catch (e) {
            throw e;
        }
    }

    public async getHDist(date: string, truckId: string): Promise<Result<{viagemR: string[]}>> {
        try {
            const hdist = await this.planningRouteRepo.getHDist(date, truckId);

            return Result.ok<{viagemR: string[]}>(hdist);
        } catch (e) {
            throw e;
        }
    }

    public async getHMassa(date: string, truckId: string): Promise<Result<{viagemR: string[]}>> {
        try {
            const hmassa = await this.planningRouteRepo.getHMassa(date, truckId);

            return Result.ok<{viagemR: string[]}>(hmassa);
        } catch (e) {
            throw e;
        }
    }

    public async getHMassaTempo(date: string, truckId: string): Promise<Result<{viagemR: string[]}>> {
        try {
            const hmassatempo = await this.planningRouteRepo.getHMassaTempo(date, truckId);

            return Result.ok<{viagemR: string[]}>(hmassatempo);
        } catch (e) {
            throw e;
        }
    }

    public async getAlgGen(date: string, truckId: string): Promise<Result<{ viagemR: string[] }>> {
        try {
            const alggen = await this.planningRouteRepo.getAlgGen(date, truckId);

            return Result.ok<{viagemR: string[]}>(alggen);
        } catch (e) {
            throw e;
        }
    }



}