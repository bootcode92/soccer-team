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



router.post('/', async (req, res) => {
    try {
        const body = {
            name: req.body.name,
            stadium: req.body.stadium,
            coach: req.body.coach,
            president: req.body.president,
            foundedAt: req.body.foundedAt,
        }
        const soccerTeam = await createSoccerTeam.execute(body);
        return res.status(201).send(soccerTeam.props);
    } catch(e) {
        return res.status(400).send(e.message);
    }
})

router.get('/:id', async (req, res) => {
    const soccerTeamId = req.params.id
    const soccerTeam = await getSoccerTeamById.execute({
        id: soccerTeamId,
    });
    return res.status(200).send(soccerTeam.props);
})

export { router as SoccerTeamRouter }