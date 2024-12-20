import mongoose from "mongoose";
import Comment from "../model/commentModel.js";

export async function createComment(req,res){
    try {
        const {content}=req.body;
const commentToAdd=new Comment({
    name:req.user.name, content,email:req.user.email
})
await commentToAdd.save();
console.log(req.body);
res.status(201).send({message:"Comment Added Sucessfully",commentAddedBy:req.user.name});
    } catch (error) {
        res.status(500).send({message:"Error adding Comment"});
    }

}

export async function deleteComment(req,res){
    console.log("reached delete");
    
    const idToDelete = req.params.id;
    console.log(idToDelete);
    

  try {
      console.log("reached delete2");
    if (!idToDelete)
      return res.status(400).send({ message: "You must specify a comment ID" });

    if (!mongoose.Types.ObjectId.isValid(idToDelete))
      return res
        .status(400)
        .send({ message: "Given ID is not in proper format" });

    const deletedComment = await Comment.findByIdAndDelete(idToDelete);
    console.log(deleteComment);
    

    // const deletedBlog = await Blog.find({ id: idToDelete });

    // const deletedBlog = await Blog.deleteOne({ id: idToDelete });

    if (!deletedComment)
      return res
        .status(404)
        .send({ message: "No comment found with the given ID" });

    res.send({ message: "Comment with the given ID deleted" });
  } catch (error) {
    return res.status(500).send({ message: "Error deleting comment", error });
  }

}
export async function updateComment(req,res){
    console.log("reached update2");
    const idToUpdate = req.params.id;
    console.log(idToUpdate);
    
  const { content } = req.body;
  try {
    if (!idToUpdate)
      return res.status(400).send({ message: "You must specify a comment ID" });
    console.log("reached update2");

    if (!mongoose.Types.ObjectId.isValid(idToUpdate))
      return res
        .status(400)
        .send({ message: "Given ID is not in proper format" });

    const updatedComment = await Comment.findByIdAndUpdate(idToUpdate, {
      name:req.user.name,
      email:req.user.email,
      content,
    });
    if (!updatedComment)
      return res
        .status(404)
        .send({ message: "No comment found with the given ID" });

    res.send({ message: "Comment with the given ID is updated" });
  } catch (error) {
    return res.status(500).send({ message: "Error updating comment", error });
  }
}