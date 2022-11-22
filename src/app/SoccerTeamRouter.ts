import * as express from 'express';
import { UuidGateway } from '../adapters/gateways/UuidGateway';
import { MongodbSoccerTeamRepository } from '../adapters/repositories/mongodb/MongodbSoccerTeamRepository';
import { CreateSoccerTeam } from '../core/usecases/CreateSoccerTeam';
import { GetSoccerTeamById } from '../core/usecases/GetSoccerTeamById';

const router = express.Router();

const mongodbSoccerTeamRepository = new MongodbSoccerTeamRepository();
const uuidGateway = new UuidGateway();
const createSoccerTeam = new CreateSoccerTeam(mongodbSoccerTeamRepository, uuidGateway);
const getSoccerTeamById = new GetSoccerTeamById(mongodbSoccerTeamRepository);

router.post('/', (req, res) => {
    const body = {
        name: req.body.name,
        stadium: req.body.stadium,
        coach: req.body.coach,
        president: req.body.president,
        foundedAt: req.body.foundedAt,
    }
    const soccerTeam = createSoccerTeam.execute(body);
    return res.status(200).send(soccerTeam);
})

router.get('/:id', (req, res) => {
    const soccerTeamId = req.params.id
    const soccerTeam = getSoccerTeamById.execute({
        id: soccerTeamId,
    });
    return res.status(200).send(soccerTeam);
})

export { router as SoccerTeamRouter }