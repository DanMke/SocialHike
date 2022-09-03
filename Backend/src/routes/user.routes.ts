import express from 'express';

import UserController from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.post('/users', UserController.createUser);

userRouter.get('/users', UserController.getUsers);

userRouter.get('/users/:email', UserController.getUserByEmail);

userRouter.put('/users/:email', UserController.updateUserByEmail);

userRouter.delete('/users/:email', UserController.deleteUserByEmail);

userRouter.post('/users/:email/followers', UserController.addFollowerByEmail);

userRouter.post('/users/:email/following', UserController.addFollowingByEmail);

userRouter.delete('/users/:email/followers', UserController.deleteFollowerByEmail);

userRouter.delete('/users/:email/following', UserController.deleteFollowingByEmail);

export default userRouter;