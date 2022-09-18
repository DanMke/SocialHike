import express from 'express';

import ActivityController from '../controllers/activity.controller';

const activityRouter = express.Router();

activityRouter.post('/activities', ActivityController.createActivity);

activityRouter.post('/activities/data', ActivityController.getDataOfActivity);

activityRouter.get('/activities', ActivityController.getActivities);

activityRouter.get('/activities/:id', ActivityController.getActivityById);

activityRouter.get('/activities/user/:userid', ActivityController.getActivitiesByUser);

activityRouter.post('/activitiesNear', ActivityController.getActivitiesNearestOfPoint);

activityRouter.get('/activities/following/:email', ActivityController.getActivitiesOfFollowingUsers);

activityRouter.post('/activities/:id/like', ActivityController.likeActivity);

activityRouter.post('/activities/:id/comments', ActivityController.commentActivity);

export default activityRouter;