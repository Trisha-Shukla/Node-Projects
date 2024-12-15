import mongoose from "mongoose";


export async function connectToDB() {
    
    await mongoose.connect("mongodb://localhost:27017/fileSharingApp")
}