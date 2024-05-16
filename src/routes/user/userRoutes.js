import { Router } from "express";
import getData from "../../controllers/user/getData";
import getSchedule from "../../controllers/user/getSchedule";

const userRouter = Router();

userRouter.get("/info", getData);
userRouter.get("/schedule", getSchedule);

export default userRouter;
