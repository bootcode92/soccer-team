import { SoccerTeam } from "../entities/SoccerTeam";
import { IdGateway } from "../gateways/IdGateway";
import { SoccerTeamRepository } from "../repositories/SoccerTeamRepository";
import { Usecase } from "./Usecase";

export type EnrollPlayerInput = {
    jerseyNumber: number;
    name: string;
    teamId: string;
}

export class EnrollPlayer implements Usecase<EnrollPlayerInput, SoccerTeam> {

    constructor(
        private readonly soccerTeamRepository: SoccerTeamRepository,
        private readonly idGateway: IdGateway,
    ) {}

    async execute(input: EnrollPlayerInput): Promise<SoccerTeam> {
        const soccerTeam = await this.soccerTeamRepository.getById(input.teamId);
        const id = this.idGateway.generate();
        soccerTeam.enrollPlayer({
            id: id,
            jerseyNumber: input.jerseyNumber,
            name: input.name,
        })
        await this.soccerTeamRepository.save(soccerTeam);
        return soccerTeam;
    }
}