import { SoccerTeam } from "../entities/SoccerTeam";

export interface SoccerTeamRepository {
    save(soccerTeam: SoccerTeam): Promise<void> | void;
    getById(id: string): Promise<SoccerTeam> | SoccerTeam;
    getByName(name: string): Promise<SoccerTeam> | SoccerTeam;
}