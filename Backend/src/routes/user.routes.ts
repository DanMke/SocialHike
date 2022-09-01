import express from 'express';

import UserController from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.post('/users', UserController.createUser);
    
    // const user = req.body;
    // console.log(user);
    // // create user object
    // // salvar no banco de dados
    // res.send('Cria novo item');

userRouter.get('/users', (req, res) => {
    res.send('Lê todos os itens');
});

userRouter.get('/users/:id', (req, res) => {
    const id: number = +req.params.id;
    res.send(`Lê o item ${id}`);
});

userRouter.put('/users/:id', (req, res) => {
    const id: number = +req.params.id;
    res.send(`Atualiza o item ${id}`);
});

userRouter.delete('/users/:id', (req, res) => {
    const id: number = +req.params.id;
    res.send(`Apaga o item ${id}`);
});

export default userRouter;