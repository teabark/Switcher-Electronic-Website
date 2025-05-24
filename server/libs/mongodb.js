import mongoose from "mongoose";
import env from "dotenv";

env.config();

const connectMongo = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB!")
    }catch(error){
        console.log("MongoDb connection failed!", error)
    }
}

export default connectMongo;