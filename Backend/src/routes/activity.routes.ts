import express from 'express';

import ActivityController from '../controllers/activity.controller';

const activityRouter = express.Router();

activityRouter.post('/activities', ActivityController.createActivity);

activityRouter.get('/activities', ActivityController.getActivities);

activityRouter.get('/activities/:email', ActivityController.getActivitiesByUser);

export default activityRouter;