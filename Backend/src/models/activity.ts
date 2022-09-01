import mongoose, {Schema} from 'mongoose';

const activitySchema = new Schema({
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    points: [
        {
            coords: {
                latitude: {
                    type: Number,
                    required: true
                },
                longitude: {
                    type: Number,
                    required: true
                },
                altitude: {
                    type: Number,
                    required: true
                },
                altitudeAccuracy: {
                    type: Number,
                    required: true
                },
                accuracy: {
                    type: Number,
                    required: true
                },
                heading: {
                    type: Number,
                    required: true
                },
                speed: {
                    type: Number,
                    required: true
                }
            },
            timestamp: {
                type: Date,
                required: true
            }
        }
    ],
    distance: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    averageSpeed: {
        type: Number,
        required: true
    },
    maxSpeed: {
        type: Number,
        required: true
    },
    averagePace: {
        type: Number,
        required: true
    },
    maxPace: {
        type: Number,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true,
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Activity = mongoose.model('Activities', activitySchema);

export default Activity;