import { MongodbSoccerTeamRepository } from "../repositories/mongodb/MongodbSoccerTeamRepository"
import * as mongoose from 'mongoose';
import { SoccerTeam } from "../../core/entities/SoccerTeam";
import { v4 } from "uuid";

describe('When i call MongodbSoccerTeamRepository ====>', () => {
    let mongodbSoccerTeamRepository: MongodbSoccerTeamRepository;

    beforeAll(() => {
        mongoose.connect('mongodb://localhost:27017/dummy_data', (err) => {
            if (err) {
                throw err;
            }
            console.info('mongodb connected');
        })
        mongodbSoccerTeamRepository = new MongodbSoccerTeamRepository();
    })


    it('should save a soccer team', async () => {
        const soccerTeam = SoccerTeam.create({
            coach: "pazoek",
            foundedAt: new Date(),
            id: v4(),
            name: "poaze",
            president: "ddaze",
            stadium: "azee"
        })
        await mongodbSoccerTeamRepository.save(soccerTeam);
    })

    it('Should retrieve a soccer team by his id', async () => {
        const soccerTeam = SoccerTeam.create({
            coach: "pazoek",
            foundedAt: new Date(),
            id: v4(),
            name: "poaze",
            president: "ddaze",
            stadium: "azee"
        })
        await mongodbSoccerTeamRepository.save(soccerTeam);

        const getSoccerTeam = await mongodbSoccerTeamRepository.getById(soccerTeam.props.id);
        expect(getSoccerTeam.props.name).toEqual("poaze")
    })

    it('Should throw if soccer team is not found', async () => {
        const soccerTeamNotFound = mongodbSoccerTeamRepository.getById('Id that doesnt exist')
        await expect(soccerTeamNotFound).rejects.toThrow();
    })
})