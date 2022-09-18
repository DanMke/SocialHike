import Activity from '../models/activity';
import User from '../models/user';

const ActivityService = {
    async createActivity(activity: any) {
        try {
            const newActivity = new Activity(activity);
            await newActivity.save();
            return newActivity;
        }
        catch (error) {
            throw error;
        }
    },
    async updateActivity(activity: any) {
        try {
            const updateActivity = await Activity.findOneAndUpdate({ _id: activity._id }, activity, { new: true }).populate('user').populate('comments.user');
            return updateActivity;
        }
        catch (error) {
            throw error;
        }
    },
    async getActivityById(id: any) {
        try {
            const activity = await Activity.findById(id).populate('user').populate('comments.user');
            return activity;
        }
        catch (error) {
            throw error;
        }
    },
    async getActivities() {
        try {
            const activities = await Activity.find().populate('user').populate('comments.user');
            return activities;
        }
        catch (error) {
            throw error;
        }
    },
    async getActivitiesByUser(userid: string) {
        try {
            const activities = await Activity.find({ 'user': userid }).populate('user').populate('comments.user');
            return activities;
        }
        catch (error) {
            throw error;
        }
    },
    async getActivitiesByUserAndDate(email: string, date: string) {
        try {
            const activities = await Activity.find({ email, date });
            return activities;
        }
        catch (error) {
            throw error;
        }
    },
    async likeActivity(id: string, action: string, user: any) {
        try {
            if (action === 'add') {
                const updatedActivity: any = await Activity.findOneAndUpdate({ _id: id }, { $addToSet: { likes: {_id: user} } }, { new: true }).populate('user').populate('comments.user');
                const userLikedId = updatedActivity.user._id;
                const updatedUser = await User.findOneAndUpdate({ _id: user, 'following.user': userLikedId }, { $inc: { 'following.$.strength': -2 } }, { new: true });
                console.log(updatedUser);
                return updatedActivity;
            } else {
                const updatedActivity: any = await Activity.findOneAndUpdate({ _id: id }, { $pull: { likes: {_id: user} } }, { new: true }).populate('user').populate('comments.user');
                const userLikedId = updatedActivity.user._id;
                const updatedUser = await User.findOneAndUpdate({ _id: user, 'following.user': userLikedId }, { $inc: { 'following.$.strength': 2 } }, { new: true });
                console.log(updatedUser);
                return updatedActivity;
            }
        }
        catch (error) {
            throw error;
        }
    },
    async commentActivity(id: string, comment: any, user: any) {
        try {
            const updatedActivity: any = await Activity.findOneAndUpdate({ _id: id }, { $push: { comments: { user: user, comment: comment, createdAt: new Date()} } }, { new: true }).populate('comments.user');
            const userLikedId = updatedActivity.user._id;
            const updatedUser = await User.findOneAndUpdate({ _id: user, 'following.user': userLikedId }, { $inc: { 'following.$.strength': -4 } }, { new: true });
            console.log(updatedUser);
            return updatedActivity;
        }
        catch (error) {
            throw error;
        }
    }

}

export default ActivityService;