import { v2 as cloudinary } from 'cloudinary';
import "dotenv/config"

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET_KEY 
});

export async function uploadToCloudinary(file){
    console.log("reahed cloudinary");
    

    const result=await new Promise((resolve,reject)=>{
        const uploadStream=cloudinary.uploader.upload_stream(
            {folder: "books"},
            (error,result)=>{
                if(error) reject(error);
                else resolve(result)
            });
            uploadStream.end(file.buffer);
        });
        return result
    }
