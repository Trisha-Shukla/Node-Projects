import mongoose from "mongoose";

export async function connectingToDB(){
    try {
        await mongoose.connect("mongodb+srv://dbUser:dbUserPassword@cluster0.fzqjq.mongodb.net/allohealth?retryWrites=true&w=majority&appName=Cluster0")
    } catch (error) {
        console.error('Database connection failed:', error.message);
    process.exit(1);
    }
}