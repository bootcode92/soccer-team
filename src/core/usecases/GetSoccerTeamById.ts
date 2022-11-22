import { SoccerTeam } from "../entities/SoccerTeam";
import { SoccerTeamRepository } from "../repositories/SoccerTeamRepository";
import { Usecase } from "./Usecase";

export type GetSoccerTeamByIdInput = {
    id: string;
}

export class GetSoccerTeamById implements Usecase<GetSoccerTeamByIdInput, SoccerTeam> {
    
    constructor(
        private readonly soccerTeamRepository: SoccerTeamRepository,
    ) {}

    async execute(input: GetSoccerTeamByIdInput): Promise<SoccerTeam> {
       return this.soccerTeamRepository.getById(input.id);
    }
    
}