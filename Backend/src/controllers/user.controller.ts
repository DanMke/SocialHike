import express from "express";

import UserService from "../services/user.service";

const UserController = {
    createUser: async (req: express.Request, res: express.Response) => {
        try {
            const user = req.body;
            const createdUser = await UserService.createUser(user);
            return res.status(201).json({
                message: "User created successfully!",
                createdUser
                });
        } catch (error: any) {
            if (error.code === 11000) {
                return res.status(409).json({
                    message: "User already exists!"
                });
            } else {
                return res.status(500).send(error);
            }
        }
    },
    getUserByEmail: async (req: express.Request, res: express.Response) => {
        try {
            const email = req.params.email;
            const user = await UserService.getUserByEmail(email);
            if (user) {
                return res.status(200).json(user);
            } else {
                return res.status(404).json({
                    message: "User not found!"
                });
            }
        } catch (error: any) {
            return res.status(500).send(error);
        }
    },
    getUsers: async (req: express.Request, res: express.Response) => {
        try {
            const users = await UserService.getUsers();
            return res.status(200).json(users);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    },
    updateUserByEmail: async (req: express.Request, res: express.Response) => {
        try {
            const email = req.params.email;
            const user = req.body;
            const updatedUser = await UserService.updateUserByEmail(email, user);
            if (updatedUser) {
                return res.status(200).json({
                    message: "User updated successfully!",
                    user: updatedUser
                });
            } else {
                return res.status(404).json({
                    message: "User not found!"
                });
            }
        } catch (error: any) {
            return res.status(500).send(error);
        }
    },
    deleteUserByEmail: async (req: express.Request, res: express.Response) => {
        try {
            const email = req.params.email;
            const deletedUser = await UserService.deleteUserByEmail(email);
            return res.status(200).json({
                message: "User deleted successfully!",
                user: deletedUser
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    },
    addFollowerByEmail: async (req: express.Request, res: express.Response) => {
        try {
            const email = req.params.email;
            const {follower} = req.body;
            const updatedUser = await UserService.addFollowerByEmail(email, follower);
            return res.status(200).json(updatedUser);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    },
    addFollowingByEmail: async (req: express.Request, res: express.Response) => {
        try {
            const email = req.params.email;
            const {following} = req.body;
            const updatedUser = await UserService.addFollowingByEmail(email, following);
            return res.status(200).json(updatedUser);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    },
    deleteFollowerByEmail: async (req: express.Request, res: express.Response) => {
        try {
            const email = req.params.email;
            const {follower} = req.body;
            const updatedUser = await UserService.deleteFollowerByEmail(email, follower);
            return res.status(200).json(updatedUser);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    },
    deleteFollowingByEmail: async (req: express.Request, res: express.Response) => {
        try {
            const email = req.params.email;
            const {following} = req.body;
            const updatedUser = await UserService.deleteFollowingByEmail(email, following);
            return res.status(200).json(updatedUser);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }
};

export default UserController;