import {Router} from 'express'
import { createJob,getJob,updateJob,delteJob } from '../controllers/jobControllers.js';

const jobRouter= Router();

jobRouter.post("/create",createJob);
jobRouter.get("/get",getJob);
jobRouter.delete("/delete/:id",delteJob);
jobRouter.put("/update/:id",updateJob);

export default jobRouter;