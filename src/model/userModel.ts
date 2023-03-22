import mongoose from "mongoose";

const schema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
        unique: true,
        dropDubs: true
    },
    userEmail: {
        type: String,
        require: true,
        unique: true,
        dropDubs: true
    },
    password: {
        type: String,
        require: true,
    },
    image: {
        type: String,
    }
});

const User = mongoose.model("User", schema);

export default User;