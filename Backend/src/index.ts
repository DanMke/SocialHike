import express from 'express';
import cors from 'cors';

import connectDatabase from './config/database';
import userRouter from './routes/user.routes';
import activityRouter from './routes/activity.routes';

const PORT = 4000;
const HOSTNAME = 'http://localhost';

connectDatabase();

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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