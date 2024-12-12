import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    userName:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:8,
        maxLength:100,
    },
    phone:{
        type:Number,
        required:true,
    },
    isEmailVerified:{
        type:Boolean,
        default:false,
    }
},{
    timestamps:true
}
)

const Users=mongoose.model("user",userSchema);

export default Users;