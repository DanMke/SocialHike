import User from '../models/user';

const UserService = {
    async createUser(user: any) {
        try {
            const newUser = new User(user);
            await newUser.save();
            return newUser;
        }
        catch (error) {
            throw error;
        }
    }
}

export default UserService;