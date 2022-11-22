export type PlayerProperties = {
    id: string;
    name: string;
    jerseyNumber: number;
    teamId: string;
}

export class Player {
    props: PlayerProperties;

    constructor(props: PlayerProperties) {
        this.props = props;
    }


    static create(props: PlayerProperties) {
        return new Player({
            id: props.id,
            jerseyNumber: props.jerseyNumber,
            name: props.name,
            teamId: props.teamId,
        })
    }
}