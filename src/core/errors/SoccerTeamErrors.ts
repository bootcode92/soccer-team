import {DomainError} from "./DomainError";

export namespace SoccerTeamErrors {
    export class NotAuthorizedSoccerTeam extends DomainError {
        constructor() {
            super("FUCK_LOM", {});
        }
    }
    export class SoccerTeamNotFound extends DomainError {
        constructor() {
            super("SOCCER_TEAM_NOT_FOUND");
        }
    }
}