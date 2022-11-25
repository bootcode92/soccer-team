import {SoccerTeam} from "../../../../core/entities/SoccerTeam";
import {SoccerTeamDocument} from "../models/SoccerTeamModel";

export class SoccerTeamMapper {
    toSoccerTeamDocument(soccerTeam: SoccerTeam): SoccerTeamDocument {
        return {
            id: soccerTeam.props.id,
            coach: soccerTeam.props.coach,
            name: soccerTeam.props.name,
            foundedAt: +soccerTeam.props.foundedAt,
            stadium: soccerTeam.props.stadium,
            president: soccerTeam.props.president,
            players: soccerTeam.props.players,
        }
    }

    toSoccerTeam(soccerTeamModel: SoccerTeamDocument): SoccerTeam {
        return new SoccerTeam({
            id: soccerTeamModel.id,
            coach: soccerTeamModel.coach,
            name: soccerTeamModel.name,
            foundedAt: new Date(soccerTeamModel.foundedAt),
            stadium: soccerTeamModel.stadium,
            president: soccerTeamModel.president,
            players: soccerTeamModel.players,
        })
    }
}