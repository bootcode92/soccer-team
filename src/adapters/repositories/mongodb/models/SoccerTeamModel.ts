import {model, Schema} from "mongoose";
import {Player} from "../../../../core/entities/Player";


export type SoccerTeamDocument = {
    id: string;
    name?: string;
    foundedAt: number;
    stadium: string;
    coach: string;
    president: string;
    players: Player[];
}

export const soccerTeamSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false,
    },
    foundedAt: {
        type: Number,
        required: true,
    },
    stadium: {
        type: String,
        required: true,
    },
    coach: {
        type: String,
        required: true,
    },
    president: {
        type: String,
        required: true,
    },
    players: {
        type: Object,
        default: []
    },
})

export const soccerTeamModel = model('SoccerTeams', soccerTeamSchema)