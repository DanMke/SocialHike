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
            const user = await User.findOne({ email }).populate('followers').populate('following.user');
            return user;
        }
        catch (error) {
            throw error;
        }
    },
    async getUsers() {
        try {
            const users = await User.find().populate('followers').populate('following.user');
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
    },
    async addFollowerByEmail(email: string, followerEmail: string) {
        try {
            const user = await User.findOne({ email });
            const follower = await User.findOne({ email: followerEmail });
            if (user && follower) {
                const updatedUser = User.findOneAndUpdate({ email }, { $addToSet: { followers: follower } }, { new: true });
                return updatedUser;
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw error;
        }
    },
    async deleteFollowerByEmail(email: string, followerEmail: string) {
        try {
            const user = await User.findOne({ email });
            const follower = await User.findOne({ email: followerEmail });
            if (user && follower) {
                const updatedUser = await User.findOneAndUpdate({ email }, { $pull: { followers: follower._id } }, { new: true });
                return updatedUser;
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw error;
        }
    },
    async addFollowingByEmail(email: string, followingEmail: string) {
        try {
            const user = await User.findOne({ email });
            const following = await User.findOne({ email: followingEmail });
            if (user && following) {
                const updatedUser = await User.findOneAndUpdate({ email }, { $addToSet: { following: {user: following} } }, { new: true });
                return updatedUser;
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw error;
        }
    },
    async deleteFollowingByEmail(email: string, followingEmail: string) {
        try {
            const user = await User.findOne({ email });
            const following = await User.findOne({ email: followingEmail });
            if (user && following) {
                const updatedUser = await User.findOneAndUpdate({ email }, { $pull: { following: {user: following._id} } }, { new: true });
                return updatedUser;
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw error;
        }
    }
};

export default UserService;