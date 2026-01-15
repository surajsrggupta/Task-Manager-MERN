import { Schema, model } from "mongoose"; 

const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    timestamps:{
        type:String,
        default: Date.now(),
    }

},{timestamps:true})

const User = new model ("User", UserSchema);
export default User;