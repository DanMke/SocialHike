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
            const updateActivity = await Activity.findOneAndUpdate({ _id: activity._id }, activity, { new: true });
            return updateActivity;
        }
        catch (error) {
            throw error;
        }
    },
    async getActivityById(id: any) {
        try {
            const activity = await Activity.findById(id);
            return activity;
        }
        catch (error) {
            throw error;
        }
    },
    async getActivities() {
        try {
            const activities = await Activity.find().sort({ start: -1 });
            return activities;
        }
        catch (error) {
            throw error;
        }
    },
    async getActivitiesByUser(email: string) {
        try {
            const activities = await Activity.find({ email }).sort({ start: -1 });
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
    }
}

export default ActivityService;