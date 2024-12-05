import { uploadToCloudinary } from "../middleware/cloudinary.js";
import Add from "../models/addImage.js";

const addImage=async(req,res)=>{
    // console.log(req.file);
    // console.log(req.body);
    await uploadToCloudinary(req.file)
    
    // try {
    //     const {title,author,desciption,price}=req.body;
    //     const image=req.file.path;
    
    //     const newBook= new Add({title,author,desciption,price,image});
    //     await newBook.save()
    //     return res.status(201).send({message:"BookAdded"})

        
    // } catch (error) {
    //     return res.status(500).send({message:"Error adding Book",error})
    // }
    
}

export default addImage