import express from 'express';

import ActivityService from '../services/activity.service';

function deg2rad(deg: number) {
    return deg * (Math.PI/180);
}

function distanceHaversine(lat1: number, lon1: number, lat2: number, lon2: number) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
}

function distanceVincenty(lat1: number, lon1: number, lat2: number, lon2: number) {
    var a = 6378137,
        b = 6356752.3142,
        f = 1 / 298.257223563, // WGS-84 ellipsoid params
        L = deg2rad((lon2-lon1)),
        U1 = Math.atan((1 - f) * Math.tan(deg2rad(lat1))),
        U2 = Math.atan((1 - f) * Math.tan(deg2rad(lat2))),
        sinU1 = Math.sin(U1),
        cosU1 = Math.cos(U1),
        sinU2 = Math.sin(U2),
        cosU2 = Math.cos(U2),
        lambda = L,
        lambdaP,
        iterLimit = 100;
    do {
        var sinLambda = Math.sin(lambda),
            cosLambda = Math.cos(lambda),
            sinSigma = Math.sqrt((cosU2 * sinLambda) * (cosU2 * sinLambda) + (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) * (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda));
        if (0 === sinSigma) {
        return 0; // co-incident points
     };
     var cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda,
         sigma = Math.atan2(sinSigma, cosSigma),
         sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma,
         cosSqAlpha = 1 - sinAlpha * sinAlpha,
         cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha,
         C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
     if (isNaN(cos2SigmaM)) {
      cos2SigmaM = 0; // equatorial line: cosSqAlpha = 0 (§6)
     };
     lambdaP = lambda;
     lambda = L + (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
    } while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0);
   
    if (0 === iterLimit) {
     return NaN; // formula failed to converge
    };
   
    var uSq = cosSqAlpha * (a * a - b * b) / (b * b),
        A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq))),
        B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq))),
        deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM))),
        s = b * A * (sigma - deltaSigma);
    return s;
};

function calculateElevation(activity: any) {
    var maxElevation = 0;
    var sumElevation = 0;
    var elevations: number[] = [];
    
    for (var i = 0; i < activity.points.length; i++) {
        elevations.push(activity.points[i].coords.altitude);
        if (activity.points[i].coords.altitude > maxElevation) {
            maxElevation = activity.points[i].coords.altitude;
        }
        sumElevation += activity.points[i].coords.altitude;
    }
    
    activity.elevations = elevations;
    activity.maxElevation = maxElevation;
    activity.sumElevation = sumElevation;
    activity.averageElevation = sumElevation / activity.points.length;
}

function calculateDistanceAndDependents(activity: any) {
    var maxPace: number = 1000000;
    var sumPace: number = 0;
    var paces: any[] = [];

    var maxSpeed: number = 0;
    var sumSpeed: number = 0;

    var distance: number = 0;

    var divider = 1000;
    for (var i = 0; i < activity.points.length - 1; i++) {
        distance += distanceVincenty(activity.points[i].coords.latitude, activity.points[i].coords.longitude, 
            activity.points[i + 1].coords.latitude, activity.points[i + 1].coords.longitude);
        var durationUntil = (new Date(activity.points[i + 1].timestamp).getTime() - new Date(activity.start).getTime()) * 0.001;
        var speed = distance / durationUntil;
        if (speed > maxSpeed) {
            maxSpeed = speed;
        }
        sumSpeed += speed;
        if ((distance / divider) >= 1.0 || i == activity.points.length - 2) {
            var durationToPace = 0;
            var distanceToPace = 0;
            if (paces.length == 0) {
                durationToPace = durationUntil;
            } else {
                durationToPace = durationUntil - paces[paces.length - 1].durationActivity;
            }
            if (distance >= divider) {
                distanceToPace = distance - divider;
            } else {
                distanceToPace = distance;
            }
            var pace = durationToPace / (distanceToPace / 1000);
            if (pace <= maxPace) {
                maxPace = pace;
            }
            sumPace += pace;
            paces.push({durationActivity: durationUntil, distance: distance, pace: pace});
            divider += 1000;
        }
    }
    activity.distance = distance / 1000;
    activity.sumPace = sumPace;
    activity.paces = paces;
    activity.averagePace = (sumPace / paces.length) === Infinity ? 0 : (sumPace / paces.length);
    activity.maxPace = maxPace === 1000000 || maxPace === Infinity ? 0 : maxPace;
    activity.sumSpeed = sumSpeed;
    activity.maxSpeed = maxSpeed * 3.6;
    activity.averageSpeed = (sumSpeed / activity.points.length) * 3.6;
}

function updateFieldsActivity(activityToUpdate: any, activity: any) {
    activity.duration = (new Date(activity.end).getTime() - new Date(activity.start).getTime()) * 0.001;
    activity.points = activityToUpdate.points.concat(activity.points);
}

const ActivityController = {
    
    createActivity: async (req: express.Request, res: express.Response) => {
        try {
            const activity = req.body;
            activity.duration = (new Date(activity.end).getTime() - new Date(activity.start).getTime()) * 0.001;

            calculateElevation(activity);

            calculateDistanceAndDependents(activity);

            // const user: any = await UserService.getUserByEmail(req.body.user);

            // const bmr = 88.362 + (13.397 * user.weight) + (4.799 * user.height) - (5.677 * 30);
            // const calories = (bmr / 24) * 4.0 * (activity.duration / 3600);
            const calories = 0.056 * (activity.distance * 1000);
            activity.calories = calories;

            console.log(activity);

            const createdActivity = await ActivityService.createActivity(activity);

            return res.status(201).json({
                message: 'Activity created successfully!',
                createdActivity
            });
        } catch (error: any) {
            console.log(error);
            return res.status(500).send(error);
        }
    },
    getDataOfActivity: async (req: express.Request, res: express.Response) => {
        try {
            const activity = req.body;
            activity.duration = (new Date(activity.end).getTime() - new Date(activity.start).getTime()) * 0.001;

            calculateElevation(activity);

            calculateDistanceAndDependents(activity);

            // const user: any = await UserService.getUserByEmail(req.body.user);

            // const bmr = 88.362 + (13.397 * user.weight) + (4.799 * user.height) - (5.677 * 30);
            // const calories = (bmr / 24) * 4.0 * (activity.duration / 3600);
            const calories = 0.056 * (activity.distance * 1000);
            activity.calories = calories;

            console.log(activity);

            return res.status(200).json({
                message: 'Activity updated successfully!',
                activity
            });
            

        } catch (error: any) {
            console.log(error);
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
    },
    getActivityById: async (req: express.Request, res: express.Response) => {
        try {
            const id = req.params.id;
            const activity = await ActivityService.getActivityById(id);
            return res.status(200).json(activity);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    },
    getActivitiesNearestOfPoint: async (req: express.Request, res: express.Response) => {
        try {
            const point = req.body;
            var activities: any[] = await ActivityService.getActivities();
            const activitiesNearestOfPoint = [];
            for (var activity of activities) {
                activity.distanceFromMe = (distanceVincenty(activity.initialCoord.latitude, 
                    activity.initialCoord.longitude, point.latitude, point.longitude) / 1000);
                activitiesNearestOfPoint.push(activity);
            }
            return res.status(200).json(activitiesNearestOfPoint);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    },
    getActivitiesOfFollowingUsers: async (req: express.Request, res: express.Response) => {
        try {
            const email = req.params.email;
            const activities = await ActivityService.getActivities();
            // TODO: Get following users
            // TODO: Get activities of following users
            return res.status(200).json(activities);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    },
    likeActivity: async (req: express.Request, res: express.Response) => {
        try {
            const activityId = req.params.id;
            const action = req.body.action;
            const user = req.body.user;
            const activity = await ActivityService.likeActivity(activityId, action, user);
            return res.status(200).json(activity);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    },
    commentActivity: async (req: express.Request, res: express.Response) => {
        try {
            const activityId = req.params.id;
            const comment = req.body.comment;
            const user = req.body.user;
            const activity = await ActivityService.commentActivity(activityId, comment, user);
            return res.status(200).json(activity);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }
}

export default ActivityController;