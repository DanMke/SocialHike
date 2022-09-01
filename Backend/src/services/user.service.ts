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
    },
    async getUserByEmail(email: string) {
        try {
            const user = await User.findOne({ email });
            return user;
        }
        catch (error) {
            throw error;
        }
    },
    async getUsers() {
        try {
            const users = await User.find();
            return users;
        }
        catch (error) {
            throw error;
        }
    },
    async updateUserByEmail(email: string, user: any) {
        try {
            const updatedUser = await User.findOneAndUpdate({ email }, user, { new: true });
            return updatedUser;
        }
        catch (error) {
            throw error;
        }
    },
    async deleteUserByEmail(email: string) {
        try {
            const deletedUser = await User.findOneAndDelete({ email });
            return deletedUser;
        }
        catch (error) {
            throw error;
        }
    }
}

export default UserService;