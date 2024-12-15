import mongoose from "mongoose";

const FileSharingSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      default:"",
    },
    reciever: {
      type: String,
      default:"",
    },
    size: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const FileSharing = mongoose.model("file", FileSharingSchema);

export default FileSharing;