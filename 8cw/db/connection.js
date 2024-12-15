import mongoose from "mongoose";
import "dotenv/config"

export async function connectToDB() {
    
    await mongoose.connect(process.env.MONGODBURL)
    const database = client.db("jobPosting"); // Select the database
    const collection = database.collection("jobs"); // Select the collection
}