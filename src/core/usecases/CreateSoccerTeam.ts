import { SoccerTeam } from "../entities/SoccerTeam";
import { Usecase } from "./Usecase";
import { SoccerTeamRepository } from "../repositories/SoccerTeamRepository";
import { IdGateway } from "../gateways/IdGateway";

export type CreateSoccerTeamInput = {
    name: string;
    stadium: string;
    coach: string;
    president: string;
    foundedAt: Date;
}

export class CreateSoccerTeam implements Usecase<CreateSoccerTeamInput, SoccerTeam> {

    constructor(
      private readonly soccerTeamRepository: SoccerTeamRepository,
      private readonly idGateway: IdGateway,
    ) {}

    async execute(input: CreateSoccerTeamInput): Promise<SoccerTeam> {
        const isSoccerTeamAlreadyExist = await this.soccerTeamRepository.getByName(input.name);
        if (isSoccerTeamAlreadyExist) {
            throw new Error('SOCCER_TEAM_ALREADY_EXIST');
        }
        const id = this.idGateway.generate();
        const soccerTeam = SoccerTeam.create({
            coach: input.coach,
            foundedAt: input.foundedAt,
            name: input.name,
            president: input.president,
            stadium: input.stadium,
            id: id,
        });
        await this.soccerTeamRepository.save(soccerTeam);
        return soccerTeam;
    }
   
}