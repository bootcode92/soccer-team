import {GetAllTeamsByFoundationDate} from "../usecases/GetAllTeamsByFoundationDate";
import {InMemorySoccerTeamRepository} from "./adapters/repositories/InMemorySoccerTeamRepository";
import {SoccerTeam} from "../entities/SoccerTeam";

const db = new Map();

describe('Unit - GetAllByFoundationDate', () => {
    let getAllTeamsByFoundationDate: GetAllTeamsByFoundationDate;

    beforeAll(() => {
        const inMemorySoccerTeamRepository = new InMemorySoccerTeamRepository(db);
        getAllTeamsByFoundationDate = new GetAllTeamsByFoundationDate(inMemorySoccerTeamRepository);
        const soccerTeam = SoccerTeam.create({
            coach: 'Christophe Galtier',
            foundedAt: new Date('1975-11-25'),
            name: "PSG",
            president: "Nasser",
            stadium: "Parc des princes",
            id: 'eeee'
        })
        inMemorySoccerTeamRepository.save(soccerTeam);
    })


    it('Should return soccer teams', async () => {
      const results = await getAllTeamsByFoundationDate.execute({
          foundedAt: new Date('1980-11-25')
      });
      expect(results.length).toEqual(1);
    })
})