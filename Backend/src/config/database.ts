import mongoose from 'mongoose';

const uri = "mongodb+srv://socialhikeadmin:iiCtYiCCARaFfFR7@clustersocialhike.9tygyk5.mongodb.net/socialhike?retryWrites=true&w=majority";

// const mongoOptions = {
//     useFindAndModify: false,
//     useUnifiedTopology: true
// }

// const connectDatabase = async () => {
//     console.log('Try to connect MongoDB');   
//     await mongoose.connect(uri);
//     console.log('MongoDB Connected');  
// }

// export default connectDatabase;



class DatabaseConnection {
    private static _instance: DatabaseConnection;
    private database: any;

    private constructor() {
        // mongoose.connect(uri, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true,
        //     useFindAndModify: false,
        // });
        mongoose.connect(uri).then((db) => {
            this.database = db;
            console.log('MongoDB Connected');
        }).catch(err => {
            console.log(err);
        });
    }

    static getInstance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new DatabaseConnection();
        return this._instance;
    }

    getDatabase() {
        return this.database;
    }
}

export default DatabaseConnection;