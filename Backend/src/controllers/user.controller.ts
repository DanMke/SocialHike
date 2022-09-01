import express from "express";

import UserService from "../services/user.service";

const UserController = {
    createUser: async (req: express.Request, res: express.Response) => {

        try {
            const user = req.body;
            console.log(user);
            const createdUser = await UserService.createUser(user);
            return res.status(200).json({
                message: "Usuário criado com sucesso!", createdUser
                });
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }
};

export default UserController;