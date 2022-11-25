import { SoccerTeam } from "../../../core/entities/SoccerTeam";
import { SoccerTeamRepository } from "../../../core/repositories/SoccerTeamRepository";
import { soccerTeamModel } from "./models/SoccerTeamModel";
import {SoccerTeamMapper} from "./mappers/SoccerTeamMapper";

export class MongodbSoccerTeamRepository implements SoccerTeamRepository {

    private soccerTeamMapper = new SoccerTeamMapper();


    async getById(id: string): Promise<SoccerTeam> {
      const result = await soccerTeamModel.findOne({
        id: id
      })
      if (!result) {
        throw new Error('SOCCER_TEAM_NOT_FOUND')
      }
      return this.soccerTeamMapper.toSoccerTeam(result);
    }

    async save(soccerTeam: SoccerTeam): Promise<void> {
      const toSoccerTeamModel = this.soccerTeamMapper.toSoccerTeamDocument(soccerTeam);
      await soccerTeamModel.findOneAndUpdate({
        id: soccerTeam.props.id,
      }, toSoccerTeamModel, {
        upsert: true,
        runValidators: true
      })
    }

    async getByName(name: string): Promise<SoccerTeam> {
      const soccerTeamDocument = await soccerTeamModel.findOne({
        name: name,
      })
      if (!soccerTeamDocument) {
        return null;
      }
      return this.soccerTeamMapper.toSoccerTeam(soccerTeamDocument);
    }

    async getAllByFoundationDate(foundationDate: Date): Promise<SoccerTeam[]> {
      const results = await soccerTeamModel.find({
        foundedAt: {
          $lt: +foundationDate
        }
      })
      return results.map(elem => {
        return this.soccerTeamMapper.toSoccerTeam(elem);
      });
    }
}