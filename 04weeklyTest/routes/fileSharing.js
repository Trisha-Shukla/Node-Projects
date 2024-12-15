import { Router } from "express";
import { downloadFile, geterateLink, sendEmail, uploadFile } from "../controllers/fileSharingController.js";

const fileRouter=Router();

fileRouter.post("/fileSharing",uploadFile);
fileRouter.get("/fileSharing/:uuid",geterateLink);
fileRouter.get("/fileSharing/download/:uuid",downloadFile);
fileRouter.post("/fileSharing/send",sendEmail);

export default fileRouter