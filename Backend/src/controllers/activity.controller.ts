import express from 'express';

import ActivityService from '../services/activity.service';

const ActivityController = {
    createActivity: async (req: express.Request, res: express.Response) => {
        try {
            const activity = req.body;
            // activity -> start time / end time / user email / activity type / points []
            // TODO: Complete activity -> distance / duration / max pace / average pace / calories / max elevation / average elevation / max speed / average speed
            activity.distance = 0;
            activity.duration = 0;
            activity.maxPace = 0;
            activity.averagePace = 0;
            activity.calories = 0;
            activity.maxElevation = 0;
            activity.averageElevation = 0;
            activity.maxSpeed = 0;
            activity.averageSpeed = 0;
            const createdActivity = await ActivityService.createActivity(activity);
            return res.status(201).json({
                message: 'Activity created successfully!',
                createdActivity
            });
        } catch (error: any) {
            return res.status(500).send(error);
        }
    },
    getActivities: async (req: express.Request, res: express.Response) => {
        try {
            const activities = await ActivityService.getActivities();
            return res.status(200).json(activities);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    },
    getActivitiesByUser: async (req: express.Request, res: express.Response) => {
        try {
            const email = req.params.email;
            const activities = await ActivityService.getActivitiesByUser(email);
            return res.status(200).json(activities);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }
}

export default ActivityController;