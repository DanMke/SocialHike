
import mongoose, {Schema} from 'mongoose';

const uri = "mongodb+srv://socialhikeadmin:iiCtYiCCARaFfFR7@clustersocialhike.9tygyk5.mongodb.net/?retryWrites=true&w=majority";

// const mongoOptions = {
//     useFindAndModify: false,
//     useUnifiedTopology: true
// }

const connectDB = async () => {
    console.log('Try to connect MongoDB');   
    await mongoose.connect(uri);
    console.log('MongoDB Connected');  
}

export default connectDB;
