import { SoccerTeam } from "../../../entities/SoccerTeam";
import { SoccerTeamRepository } from "../../../repositories/SoccerTeamRepository";

export class InMemorySoccerTeamRepository implements SoccerTeamRepository {

    constructor(
        private readonly db: Map<string, SoccerTeam>
    ) {}


    getByName(name: string): SoccerTeam {
        const values = Array.from(this.db.values());
        const soccerTeam = values.find(elem => elem.props.name === name.toLowerCase());
        return soccerTeam;
    }

    save(soccerTeam: SoccerTeam): void {
        this.db.set(soccerTeam.props.id, soccerTeam);
        return;
    }

    getById(id: string): SoccerTeam {
        const soccerTeam = this.db.get(id);
        if (!soccerTeam) {
            throw new Error('SOCCER_TEAM_NOT_FOUND');
        }
        return soccerTeam;
    }

    getAllByFoundationDate(foundationDate: Date): SoccerTeam[] {
        // foundation date is 25 nov 1985.
        // Resultat doit être toutes les équipes de foot d'avant le 25 nov 1985.
        const values = Array.from(this.db.values());
        return values.filter(elem => elem.props.foundedAt < foundationDate)
    }
}