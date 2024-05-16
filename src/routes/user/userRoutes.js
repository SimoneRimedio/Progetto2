import { Router } from "express";
import getData from "../../controllers/user/getData.js";
import getSchedule from "../../controllers/user/getSchedule.js";

const UserRouter = Router();

UserRouter.get("/info", getData);
UserRouter.get("/schedule", getSchedule);

export default UserRouter;
