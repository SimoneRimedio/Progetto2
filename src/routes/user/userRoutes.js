const express = require("express");
const getData = require("../../controllers/user/getData");
const getSchedule = require("../../controllers/user/getSchedule");

const userRouter = express.Router();

userRouter.get("/info", getData);
userRouter.get("/schedule", getSchedule);

module.exports = userRouter;
