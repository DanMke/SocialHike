import Activity from '../models/activity';

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
            const activities = await Activity.find().populate('user').populate('comments.user').sort({ start: -1 });
            return activities;
        }
        catch (error) {
            throw error;
        }
    },
    async getActivitiesByUser(email: string) {
        try {
            const activities = await Activity.find({ email }).populate('user').populate('comments.user').sort({ start: -1 });
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
                const updatedActivity = await Activity.findOneAndUpdate({ _id: id }, { $addToSet: { likes: {_id: user} } }, { new: true }).populate('user').populate('comments.user');
                return updatedActivity;
            } else {
                const updatedActivity = await Activity.findOneAndUpdate({ _id: id }, { $pull: { likes: {_id: user} } }, { new: true }).populate('user').populate('comments.user');
                return updatedActivity;
            }
        }
        catch (error) {
            throw error;
        }
    },
    async commentActivity(id: string, comment: any, user: any) {
        try {
            const updatedActivity = await Activity.findOneAndUpdate({ _id: id }, { $push: { comments: { user: user, comment: comment, createdAt: new Date()} } }, { new: true }).populate('comments.user');
            return updatedActivity;
        }
        catch (error) {
            throw error;
        }
    }

}

export default ActivityService;