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
    getUsersSocial: async (req: express.Request, res: express.Response) => {
        try {
            const email = req.body.email;
            const user: any = await UserService.getUserByEmail(email);
            const allUsers: any = await UserService.getUsers();

            var usersSocialOriginal: any = {};
            var usersSocialGraph: any = {};
            var graphWeight: any = {};
            allUsers.forEach((user: any) => {
                var id = user._id;
                usersSocialOriginal[id] = user;
                usersSocialGraph[id] = user.following;
                graphWeight[id] = {};
                user.following.forEach((following: any) => {
                    graphWeight[id][following.user._id.valueOf()] = following.strength;
                });
            });

            console.log(graphWeight);

            function dfs(graph: any, start: any, visited: any = []) {
                if (!graph[start]) {
                    return visited;
                }
                visited.push(start.valueOf());
                graph[start].forEach((neighbor: any) => {
                    if (!visited.includes(neighbor.user._id.valueOf())) {
                        dfs(graph, neighbor.user._id, visited);
                    }
                });
                return visited;
            }
            const visiteds = dfs(usersSocialGraph, user._id);
            console.log(visiteds);

            var filteredVisiteds = visiteds.filter((visited: any) => {
                return visited != user._id;
            });

            console.log(filteredVisiteds);
        
            const shortestDistanceNode = (distances: any, visited: any) => {
                let shortest = null;
            
                for (let node in distances) {
                    let currentIsShortest = shortest === null || distances[node] < distances[shortest];
                    if (currentIsShortest && !visited.includes(node)) {
                        shortest = node;
                    }
                }
                return shortest;
            };
            
            const dijkstraFindShortestPath = (graph: any, startNode: any, endNode: any) => {
                // establish object for recording distances from the start node
                let distances: any = {};
                distances[endNode] = "Infinity";
                distances = Object.assign(distances, graph[startNode]);
            
                // track paths
                let parents: any = { endNode: null };
                for (let child in graph[startNode]) {
                    parents[child] = startNode;
                }
            
                // track nodes that have already been visited
                let visited: any = [];
            
                // find the nearest node
                let node = shortestDistanceNode(distances, visited);
            
                // for that node
                while (node) {
                    // find its distance from the start node & its child nodes
                    let distance = distances[node];
                    let children = graph[node];
                    // for each of those child nodes
                    for (let child in children) {
                        // make sure each child node is not the start node
                        if (String(child) === String(startNode)) {
                            continue;
                        } else {
                            // save the distance from the start node to the child node
                            let newdistance = distance + children[child];
                            // if there's no recorded distance from the start node to the child node in the distances object
                            // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
                            // save the distance to the object
                            // record the path
                            if (!distances[child] || distances[child] > newdistance) {
                                distances[child] = newdistance;
                                parents[child] = node;
                            }
                        }
                    }
                    // move the node to the visited set
                    visited.push(node);
                    // move to the nearest neighbor node
                    node = shortestDistanceNode(distances, visited);
                }
            
                // using the stored paths from start node to end node
                // record the shortest path
                let shortestPath = [endNode];
                let parent = parents[endNode];
                while (parent) {
                    shortestPath.push(parent);
                    parent = parents[parent];
                }
                shortestPath.reverse();
            
                // return the shortest path from start node to end node & its distance
                let results = {
                    distance: distances[endNode],
                    path: shortestPath,
                };
            
                return results;
            };
               
            
            var dijkstraResult: any = [];
            filteredVisiteds.forEach((visited: any) => {
                const results = dijkstraFindShortestPath(graphWeight, user._id, visited);
                console.log(results);
                var result = {
                    user: usersSocialOriginal[visited],
                    distance: results.distance,
                    path: results.path
                }
                dijkstraResult.push(result);
            });

            dijkstraResult.sort((a: any, b: any) => {
                return a.distance - b.distance;
            });
            
            allUsers.forEach((currentUser: any) => {
                for (var i = 0; i < dijkstraResult.length; i++) {
                    if (dijkstraResult[i].user._id == currentUser._id || currentUser._id == user._id.valueOf()) {
                        return;
                    } else if (i == dijkstraResult.length - 1) {
                        dijkstraResult.push({
                            user: currentUser,
                            distance: 1001,
                            path: []
                        });
                    }
                }
            });

            dijkstraResult = dijkstraResult.filter((result: any) => {
                for (var i = 0; i < user.following.length; i++) {
                    if (user.following[i].user._id.valueOf() === result.user._id.valueOf()) {
                        return false;
                    }
                }
                return true;
            });
            
            return res.status(200).json(dijkstraResult);
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
            const followingUserUpdated = await UserService.addFollowerByEmail(following, email);
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
            const followingUserUpdated = await UserService.deleteFollowerByEmail(following, email);
            return res.status(200).json(updatedUser);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }
};

export default UserController;