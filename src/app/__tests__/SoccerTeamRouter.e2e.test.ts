import * as express from 'express';
import mongoose from "mongoose";
const app = express();
import * as supertest from 'supertest';
import { SoccerTeamRouter } from "../SoccerTeamRouter";
import {SoccerTeamRepository} from "../../core/repositories/SoccerTeamRepository";
import {MongodbSoccerTeamRepository} from "../../adapters/repositories/mongodb/MongodbSoccerTeamRepository";
import {SoccerTeam} from "../../core/entities/SoccerTeam";

describe('When i call SoccerTeamRouter API =====>', () => {
    let soccerTeamRepository: SoccerTeamRepository;

    beforeAll(() => {
        app.use(express.json());

        mongoose.connect('mongodb://localhost:27017/dummy_data', (err) => {
            if (err) {
                throw err;
            }
            console.info('mongodb connected');
        })

        soccerTeamRepository = new MongodbSoccerTeamRepository();
        app.use('/team', SoccerTeamRouter);
        app.get('/status', (req, res) => {
            return res.sendStatus(200);
        })
    })

    afterAll(async () => {
        await mongoose.connection.dropDatabase()
    })

    it('Should get /status', async () => {
        await supertest(app)
            .get('/status')
            .expect(200)
    })

    it('Should post /team', async () => {
        await supertest(app)
            .post('/team')
            .send({
                name: "PSG",
                stadium: "Parc des princes",
                coach: "Christophe Galtier",
                president: "Nasser",
                foundedAt: new Date('1970-08-12'),
            })
            .expect(response => {
                const responseBody = response.body;
                expect(responseBody.coach).toEqual("Christophe Galtier");
                expect(responseBody.president).toEqual("Nasser");
            })
            .expect(201)
    })

    it('Should throw post /team', async () => {
        const soccerTeamId = 'aze'
        const soccerTeam = SoccerTeam.create({
            id: soccerTeamId,
            name: 'nantes',
            foundedAt: new Date(),
            president: 'aekekz',
            stadium: 'poaze',
            coach: 'opazke'
        });
        await soccerTeamRepository.save(soccerTeam);

        await supertest(app)
            .post('/team')
            .send({
                name: "nantes",
                stadium: "Parc des princes",
                coach: "Christophe Galtier",
                president: "Nasser",
                foundedAt: new Date('1970-08-12'),
            })
            .expect(400)
    })

    it('Should get /team/:id', async () => {
        const soccerTeamId = 'aze'
        const soccerTeam = SoccerTeam.create({
            id: soccerTeamId,
            name: 'nantes',
            foundedAt: new Date(),
            president: 'aekekz',
            stadium: 'poaze',
            coach: 'opazke'
        });
        await soccerTeamRepository.save(soccerTeam);

        await supertest(app)
            .get(`/team/${soccerTeamId}`)
            .expect(response => {
                const responseBody = response.body;
                expect(responseBody.coach).toEqual('opazke');
                expect(responseBody.stadium).toEqual('poaze');
            })
            .expect(200)
    })


})