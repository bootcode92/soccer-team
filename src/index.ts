import * as express from 'express';
import { SoccerTeamRouter } from './app/SoccerTeamRouter';
import * as mongoose from 'mongoose';

const port = 3008;

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/dummy_data', (err) => {
    if (err) {
        throw err;
    }
    console.info('mongodb connected');
})

app.get('/status', (req, res) => {
    return res.sendStatus(200);
})

app.use('/team', SoccerTeamRouter);


app.listen(port, () => {
    console.info(`server listenning on port ${port}`)
})