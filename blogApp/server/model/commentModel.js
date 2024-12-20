import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const CommentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);

const Comment = mongoose.model("comment", CommentSchema);

export default Comment;