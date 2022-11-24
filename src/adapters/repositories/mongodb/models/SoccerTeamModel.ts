import {model, Schema} from "mongoose";

const soccerTeamSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
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