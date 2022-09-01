import express from 'express';

import ActivityController from '../controllers/activity.controller';

const activityRouter = express.Router();

activityRouter.post('/activities', ActivityController.createActivity);

activityRouter.get('/activities', ActivityController.getActivities);

activityRouter.get('/activities/:email', ActivityController.getActivitiesByUser);

activityRouter.get('/activities/near', ActivityController.getActivitiesNearestOfPoint);

activityRouter.get('/activities/following/:email', ActivityController.getActivitiesOfFollowingUsers);

export default activityRouter;