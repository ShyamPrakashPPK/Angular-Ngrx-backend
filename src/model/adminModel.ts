import mongoose from "mongoose";

const schema = new mongoose.Schema({
    AdminName: {
        type: String,
        require: true,
    },
    AdminEmail: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    image: {
        type: String,
    }
});

const Admin = mongoose.model("Admin", schema);

export default Admin;