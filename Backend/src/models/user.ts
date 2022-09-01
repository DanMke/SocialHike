import mongoose, {Schema} from 'mongoose';

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    weight: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    avatar: {
        type: String
    },
    birth: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const User = mongoose.model('Users', userSchema);

export default User;