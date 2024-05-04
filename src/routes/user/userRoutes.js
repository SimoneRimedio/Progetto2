const express = require("express");
const getData = require("../../controllers/user/getData");
const getAutoComplete = require("../../controllers/user/getAutoComplete");
const getSchedule = require("../../controllers/user/getSchedule");

const userRouter = express.Router();

userRouter.get("/info", getData);
userRouter.get("/schedule", getSchedule);
userRouter.get("/autoComplete", getAutoComplete);

module.exports = userRouter;
