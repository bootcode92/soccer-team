import * as express from 'express';
import { SoccerTeamRouter } from './app/SoccerTeamRouter';
import * as mongoose from 'mongoose';
const multer  = require('multer');
const upload = multer()
const path = require('path');
const port = 3008;

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../uploads')))

mongoose.connect('mongodb://localhost:27017/dummy_data', (err) => {
    if (err) {
        throw err;
    }
    console.info('mongodb connected');
})

app.post('/profile', upload.single('mazen'), function (req, res, next) {
    console.log(req);
    return res.sendStatus(200);
})

app.get('/status', (req, res) => {
    return res.sendStatus(200);
})

app.use('/team', SoccerTeamRouter);


app.listen(port, () => {
    console.info(`server listenning on port ${port}`)
})