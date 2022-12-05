import { Player } from "./Player";
import {SoccerTeamErrors} from "../errors/SoccerTeamErrors";

export type SoccerTeamProperties = {
    id: string;
    name: string;
    foundedAt: Date;
    stadium: string;
    coach: string;
    president: string;
    players: Player[];
}

export class SoccerTeam {
    props: SoccerTeamProperties;

    constructor(props: SoccerTeamProperties) {
        this.props = props;
    }

    static create(props: {
        name: string;
        foundedAt: Date;
        stadium: string;
        coach: string;
        president: string;
        id: string;
    }) {
        if (props.name === "OM") {
            throw new SoccerTeamErrors.NotAuthorizedSoccerTeam();
        }
        return new SoccerTeam({
            id: props.id,
            coach: props.coach,
            foundedAt: props.foundedAt,
            name: props.name.toLowerCase(),
            president: props.president,
            stadium: props.stadium,
            players: []
        })
    }


    updateName(name: string) {
        if (name === "OM") {
            throw new SoccerTeamErrors.NotAuthorizedSoccerTeam();
        }
        this.props.name = name;
    }

    enrollPlayer(props: {
        id: string;
        name: string;
        jerseyNumber: number;
    }) {
        const isPlayerExist = this.props.players.find(item => item.props.jerseyNumber === props.jerseyNumber);
        if (isPlayerExist) {
            throw new Error('PLAYER_ALREADY_EXIST');
        }
        const player = Player.create({
            id: props.id,
            jerseyNumber: props.jerseyNumber,
            name: props.name,
            teamId: this.props.id,
        })
        this.props.players.push(player);
        return player;
    }

}