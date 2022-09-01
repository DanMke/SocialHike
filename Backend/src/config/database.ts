import mongoose from 'mongoose';

const uri = "mongodb+srv://socialhikeadmin:iiCtYiCCARaFfFR7@clustersocialhike.9tygyk5.mongodb.net/socialhike?retryWrites=true&w=majority";

// const mongoOptions = {
//     useFindAndModify: false,
//     useUnifiedTopology: true
// }

const connectDatabase = async () => {
    console.log('Try to connect MongoDB');   
    await mongoose.connect(uri);
    console.log('MongoDB Connected');  
}

export default connectDatabase;