
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // mongodb connection string
        mongoose.set("strictQuery", false);
        const con = await mongoose.connect('mongodb://127.0.0.1:27017/myapp');

        console.log(`MongoDB connected`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

export default connectDB;