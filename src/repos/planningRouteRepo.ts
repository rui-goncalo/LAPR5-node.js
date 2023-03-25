import {Inject, Service} from "typedi";
import IPlanningRouteRepo from "../repos/IRepos/IPlanningRouteRepo";
import {Document, FilterQuery, Model} from "mongoose";
import {IPlanningRoutePersistence} from "../persistence/dataschema/IPlanningRoutePersistence";
import {PlanningRoute} from "../domain/PlanningRoute/planningRoute";
import * as http from "http";
import * as https from "https";
import fetch from "node-fetch";
import {PlanningRouteId} from "../domain/PlanningRoute/planningRouteId";
import {PlanningRouteMap} from "../mappers/planningRouteMap";

@Service()
export default class PlanningRouteRepo implements IPlanningRouteRepo {
    constructor(@Inject('planningRouteSchema') private planingRouteSchema: Model<IPlanningRoutePersistence & Document>) {}

    private createBaseQuery(): any {
        return {
            where: {},
        };
    }

    httpAgent = new http.Agent({
    });
    httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });

    public async getBestRoute(date: string, truckId: string): Promise<{viagemR: string[];}> {
        try {
            const response = await fetch("http://127.0.0.1:3500/getBestRoute?date=" + date + "&truck=" + truckId, {method: "GET", agent: this.httpAgent,});

            const viagemTeste = await response.json();

            return {viagemR: viagemTeste.melhor_Viagem}
        } catch (e) {
            console.log(e);
        }
    }

    public async getHDist(date: string, truckId: string): Promise<{viagemR: string[];}> {
        try {
            const response = await fetch("http://127.0.0.1:3500/getHDist?date=" + date + "&truck=" + truckId, {method: "GET", agent: this.httpAgent,});

            const viagemTeste = await response.json();

            return {viagemR: viagemTeste.h_dist}
        } catch (e) {
            console.log(e);
        }
    }

    public async getHMassa(date: string, truckId: string): Promise<{viagemR: string[];}> {
        try {
            const response = await fetch("http://127.0.0.1:3500/getHMassa?date=" + date + "&truck=" + truckId, {method: "GET", agent: this.httpAgent,});

            const viagemTeste = await response.json();

            return {viagemR: viagemTeste.h_massa}
        } catch (e) {
            console.log(e);
        }
    }

    public async getHMassaTempo(date: string, truckId: string): Promise<{viagemR: string[];}> {
        try {
            const response = await fetch("http://127.0.0.1:3500/getHMassaTempo?date=" + date + "&truck=" + truckId, {method: "GET", agent: this.httpAgent,});

            const viagemTeste = await response.json();

            return {viagemR: viagemTeste.h_massa_tempo}
        } catch (e) {
            console.log(e);
        }
    }

    //Se não funcionar tentar sem o try
    public async getAlgGen(date: string, truckId: string): Promise<{ viagemR: string[] }> {
        try {
            const response = await fetch("http://127.0.0.1:3500/getAlgGen?date=" + date + "&truck=" + truckId, {method: "GET", agent: this.httpAgent,});

            const viagemTeste = await response.json();

            return {viagemR: viagemTeste.alg_gen}
        } catch (e) {
            console.log(e);
        }
    }

    // @ts-ignore
    public async exists(planningRouteId: PlanningRouteId | string): Promise<boolean> {
        const idX = planningRouteId instanceof PlanningRouteId ? (<PlanningRouteId>planningRouteId).planningRouteId : planningRouteId;

        const query = { domainId: idX };
        const t = await this.planingRouteSchema.findOne(query);

        return !!t === true;
    }

    public async save(planningRoute: PlanningRoute): Promise<PlanningRoute> {
        const query = { planningRouteId: planningRoute.props.planningRouteId };
        // @ts-ignore
        const planningRouteDocument = await this.planingRouteSchema.findOne(query);

        try {
            if (planningRouteDocument === null) {
                const rawtruck: any = PlanningRouteMap.toPersistence(planningRoute);
                const truckCreated = await this.planingRouteSchema.create(rawtruck);

                return PlanningRouteMap.toDomain(truckCreated);

            } else {
                planningRouteDocument.truckId = planningRoute.props.truckId;
                planningRouteDocument.date = planningRoute.props.date;
                planningRouteDocument.planningRoute = planningRoute.props.planningRoute;

                await planningRouteDocument.save();

                return planningRoute;
            }
        } catch (err) {
            throw err;
        }
    }

    async findByPlanningRouteId(planningRouteId: PlanningRouteId | string): Promise<PlanningRoute> {
        const query = { planningRouteId: planningRouteId };
        const planningRouteRecord = await this.planingRouteSchema.findOne(query as FilterQuery<IPlanningRoutePersistence & Document>);

        if (planningRouteRecord != null) {
            return PlanningRouteMap.toDomain(planningRouteRecord);
        } else return null;
    }
}