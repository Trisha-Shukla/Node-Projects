import { v2 as cloudinary } from 'cloudinary';
import "dotenv/config"

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET_KEY // Click 'View API Keys' above to copy your API secret
});

export async function uploadToCloudinary(file){

    const result=await new Promise((resolve,reject)=>{
        const uploadStream=cloudinary.uploader.upload_stream(
            {folder: "books"},
            (error,result)=>{
                if(error) reject(error);
                else resolve(result)
            });
            uploadStream.end(file.buffer);
        })
        console.log(result);
    }
