import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: String,
    f_name: String,
    l_name: String,
    password: String
})

const User = mongoose.model("User", UserSchema);
export default User;