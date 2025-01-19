import { Router } from "express";
import { addDoctor, getDoctors } from "../controllers/doctor.js";
import { addToQueue, getQueue ,updateQueue} from "../controllers/queue.js";
import { protectRoute } from "../middleware/protectedRoute.js";

const doctorRouter=Router();

doctorRouter.post('/doctors',protectRoute, addDoctor);
doctorRouter.get('/doctors',protectRoute, getDoctors);

// Queue Routes
doctorRouter.post('/queue',protectRoute, addToQueue);
doctorRouter.get('/queue',protectRoute, getQueue);
doctorRouter.put("/queue/:queueNumber/status", updateQueue);
  

export default doctorRouter;
