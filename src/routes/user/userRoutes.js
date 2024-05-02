const express = require("express");
const getData = require("../../controllers/user/getData");

const userRouter = express.Router();

userRouter.get("/schedule",getData);

module.exports = userRouter;