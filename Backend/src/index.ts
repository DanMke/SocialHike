import express from 'express';
import cors from 'cors';

import connectDatabase from './config/database';
import userRouter from './routes/user.routes';
import activityRouter from './routes/activity.routes';

const PORT = 4000;
const HOSTNAME = 'http://localhost';

connectDatabase();

const app = express();

app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(cors({
    origin: ['http://localhost:3000'],
}));

app.get('/', (req, res) => {
    res.send('Bem-vindo!');
});

app.use(userRouter);
app.use(activityRouter);

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`);
});