import express from 'express';

import UserController from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.post('/users', UserController.createUser);

userRouter.get('/users', UserController.getUsers);

userRouter.get('/users/:email', UserController.getUserByEmail);

userRouter.put('/users/:email', UserController.updateUserByEmail);

userRouter.delete('/users/:email', UserController.deleteUserByEmail);

export default userRouter;