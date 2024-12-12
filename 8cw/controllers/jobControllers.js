import mongoose from "mongoose";
import Job from "../models/jobModel.js";

export async function createJob(req,res){
  console.log(req.body);
  
    try {
        const {title,description,salary,location,company}=req.body;

        const newJob=new Job({title,description,salary,location,company})

        await newJob.save();
        console.log(req.body);
        res.status(201).send({message:"Job Added Sucessfully"});
        
    } catch (error) {
        res.status(500).send({message:"Error saving data"+error});
    }
    
}
export async function getJob(req,res){
  try {
    let query={};
    if(req.query.author){
      query.author={$regex : new RegExp(req.query.author,"i")};
      
    }
    if(req.query.category){
      query.category={$regex : new RegExp(req.query.category,"i")}
    }
    if(req.query.title){
      query.title={$regex : new RegExp(req.query.title,"i")}
    } 
    
    console.log(req.query);

    //PAGINATION
const page = req.query.page ? parseInt(req.query.page) : 1;
const limit = 5; //how many products to display per page
const skip = (page - 1) * limit; //0 5

const allJobs = await Job.find(query).skip(skip).limit(limit);
console.log(allJobs);


const totalCount = await Job.countDocuments(query);
res.send({
  allJobs,
    currentPage: page,
    totalPages: Math.ceil(totalCount / limit),
  });
     
  } catch (error) {
    res.status(500).send({message:"Error getting data"+error})
    
  }

}
export async function updateJob(req,res){
  const idToUpdate = req.params.id;
  const { title,
    company,
    description,
    location,
    salary } = req.body;
  try {
    if (!idToUpdate)
      return res.status(400).send({ message: "You must specify a Job ID" });

    if (!mongoose.Types.ObjectId.isValid(idToUpdate))
      return res
        .status(400)
        .send({ message: "Given ID is not in proper format" });

    const updateJob = await Job.findByIdAndUpdate(idToUpdate, {
      title,
      company,
      description,
      location,
      salary
    });
    if (!updateJob)
      return res
        .status(404)
        .send({ message: "No Job found with the given ID" });

    res.send({ message: "Job with the given ID is updated" });
  } catch (error) {
    return res.status(500).send({ message: "Error updating Job", error });
  }

}
export async function delteJob(req,res){
    const idToDelete = req.params.id;

  try {
    if (!idToDelete)
      return res.status(400).send({ message: "You must specify a job ID" });

    if (!mongoose.Types.ObjectId.isValid(idToDelete))
      return res
        .status(400)
        .send({ message: "Given ID is not in proper format" });

    const deleteJob = await Job.findByIdAndDelete(idToDelete);

    // const deletedBlog = await Blog.find({ id: idToDelete });

    // const deletedBlog = await Blog.deleteOne({ id: idToDelete });

    if (!deleteJob)
      return res
        .status(404)
        .send({ message: "No Job found with the given ID" });

    res.send({ message: "Job with the given ID deleted" });
  } catch (error) {
    return res.status(500).send({ message: "Error deleting Job"+ error });    
    }

}