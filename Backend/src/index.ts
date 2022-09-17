import express from 'express';
import cors from 'cors';

import DatabaseConnection from './config/database';
import userRouter from './routes/user.routes';
import activityRouter from './routes/activity.routes';

import checkAuth from './middlewares/auth';

import admin from "firebase-admin";

var serviceAccount = require("./serviceAccountKey.json");

const PORT = 4000;
const HOSTNAME = 'http://localhost';

DatabaseConnection.getInstance().getDatabase();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();

app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

app.use(cors({
    origin: ['http://localhost:3000'],
}));

app.get('/', (req, res) => {
    res.send('Bem-vindo!');
});

app.use(checkAuth);

app.use(userRouter);
app.use(activityRouter);

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`);
});