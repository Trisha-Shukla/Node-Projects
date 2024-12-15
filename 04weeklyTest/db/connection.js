import mongoose from "mongoose";


export async function connectToDB() {
    
    await mongoose.connect("mongodb+srv://dbUser:dbUserPassword@cluster0.fzqjq.mongodb.net/fileSharingApp?retryWrites=true&w=majority&appName=Cluster0")
}