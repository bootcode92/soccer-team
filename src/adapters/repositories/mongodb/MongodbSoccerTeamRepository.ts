import { SoccerTeam } from "../../../core/entities/SoccerTeam";
import { SoccerTeamRepository } from "../../../core/repositories/SoccerTeamRepository";
import { soccerTeamModel } from "./models/SoccerTeamModel";


export class MongodbSoccerTeamRepository implements SoccerTeamRepository {
    async getById(id: string): Promise<SoccerTeam> {
      const result = await soccerTeamModel.findOne({
        id: id
      })
      if (!result) {
        throw new Error('SOCCER_TEAM_NOT_FOUND')
      }
      return new SoccerTeam({
        id: result.id,
        coach: result.coach,
        foundedAt: result.foundedAt,
        name: result.name,
        players: result.players,
        president: result.president,
        stadium: result.stadium,
      });
    }

    async save(soccerTeam: SoccerTeam): Promise<void> {
      await soccerTeamModel.findOneAndUpdate({
        id: soccerTeam.props.id,
      }, {
        id: soccerTeam.props.id,
        name: soccerTeam.props.name,
        foundedAt: soccerTeam.props.foundedAt,
        stadium: soccerTeam.props.stadium,
        coach: soccerTeam.props.coach,
        president: soccerTeam.props.president,
        players: soccerTeam.props.players,
      }, {
        upsert: true,
      })
    }

    async getByName(name: string): Promise<SoccerTeam> {
      const soccerTeam = await soccerTeamModel.findOne({
        name: name,
      })
      if (!soccerTeam) {
        return null;
      }
      return new SoccerTeam(soccerTeam);
    }
}