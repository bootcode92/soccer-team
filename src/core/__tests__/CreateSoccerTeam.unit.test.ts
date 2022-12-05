import { SoccerTeam } from "../entities/SoccerTeam";
import { CreateSoccerTeam } from "../usecases/CreateSoccerTeam"
import { UuidGateway } from "./adapters/gateways/UuidGateway";
import { InMemorySoccerTeamRepository } from "./adapters/repositories/InMemorySoccerTeamRepository";
import {SoccerTeamErrors} from "../errors/SoccerTeamErrors";

const db = new Map<string, SoccerTeam>();

describe('When i call CreateSoccerTeam =====>', () => {
    let createSoccerTeam: CreateSoccerTeam;

    beforeAll(() => {
        const inMemorySoccerTeamRepository = new InMemorySoccerTeamRepository(db);
        const uuidGateway = new UuidGateway();
        createSoccerTeam = new CreateSoccerTeam(
            inMemorySoccerTeamRepository,
            uuidGateway
        )
    })

    it('should create soccer team', async () => {
        const result = await createSoccerTeam.execute({
            coach: 'Christophe Galtier',
            foundedAt: new Date(),
            name: "PSG",
            president: "Nasser",
            stadium: "Parc des princes"
        })
        expect(result.props.name).toEqual('psg');
    })

    it('should throw if soccer team name is OM', async () => {
        const result = createSoccerTeam.execute({
            coach: 'Christophe Galtier',
            foundedAt: new Date(),
            name: "OM",
            president: "Nasser",
            stadium: "Parc des princes"
        })
        await expect(result).rejects.toThrow(
            SoccerTeamErrors.NotAuthorizedSoccerTeam
        );
    })

    it('should throw if soccer team already exist', () => {
        const result = () => createSoccerTeam.execute({
            coach: 'Christophe Galtier',
            foundedAt: new Date(),
            name: "PSG",
            president: "Nasser",
            stadium: "Parc des princes"
        })
        expect(() => result()).toThrow();
    })

})