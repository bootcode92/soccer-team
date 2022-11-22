import { SoccerTeam } from "../entities/SoccerTeam";
import { SoccerTeamRepository } from "../repositories/SoccerTeamRepository";
import { Usecase } from "./Usecase";


export type UpdateSoccerTeamByIdInput = {
    id: string;
    name: string;
}

export class UpdateSoccerTeamById implements Usecase<UpdateSoccerTeamByIdInput, SoccerTeam> {

    constructor(
        private readonly soccerTeamRepository: SoccerTeamRepository,
    ) {}

    async execute(input: UpdateSoccerTeamByIdInput): Promise<SoccerTeam> {
        const soccerTeam = await this.soccerTeamRepository.getById(input.id);
        soccerTeam.updateName(input.name);
        await this.soccerTeamRepository.save(soccerTeam);
        return soccerTeam;
    }

}