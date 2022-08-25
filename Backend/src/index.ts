import express from 'express';
import cors from 'cors';

import userRouter from './routes/user.routes';

// Porta do servidor
const PORT = process.env.PORT || 4000;

// Host do servidor
const HOSTNAME = process.env.HOSTNAME || 'http://localhost';

// App Express
const app = express();

// JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Cors
app.use(cors({
    origin: ['http://localhost:3000'],
}));


// Endpoint raiz
app.get('/', (req, res) => {
    res.send('Bem-vindo!');
});



app.use(userRouter);

// Inicia o sevidor
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`);
});