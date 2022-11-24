import {Usecase} from "./Usecase";
import {SoccerTeam} from "../entities/SoccerTeam";
import {SoccerTeamRepository} from "../repositories/SoccerTeamRepository";

type GetAllTeamsByFoundationDateInput = {
    foundedAt: Date;
}

export class GetAllTeamsByFoundationDate implements Usecase<GetAllTeamsByFoundationDateInput, SoccerTeam[]> {

    constructor(
        private readonly soccerTeamRepository: SoccerTeamRepository,
    ) {}


    async execute(input: GetAllTeamsByFoundationDateInput): Promise<SoccerTeam[]> {
        return await this.soccerTeamRepository.getAllByFoundationDate(input.foundedAt);
    }
}