import { SoccerTeam } from "../entities/SoccerTeam";
import { CreateSoccerTeam } from "../usecases/CreateSoccerTeam"
import { UuidGateway } from "./adapters/gateways/UuidGateway";
import { InMemorySoccerTeamRepository } from "./adapters/repositories/InMemorySoccerTeamRepository";

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

    it('should create soccer team', () => {
        const result = createSoccerTeam.execute({
            coach: 'Christophe Galtier',
            foundedAt: new Date(),
            name: "PSG",
            president: "Nasser",
            stadium: "Parc des princes"
        })
        expect(result.props.name).toEqual('psg');
    })

    it('should throw if soccer team name is OM', () => {
        const result = () => createSoccerTeam.execute({
            coach: 'Christophe Galtier',
            foundedAt: new Date(),
            name: "OM",
            president: "Nasser",
            stadium: "Parc des princes"
        })
        expect(() => result()).toThrow();
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