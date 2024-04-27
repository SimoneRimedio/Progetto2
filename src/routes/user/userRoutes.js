const express = require("express");
const getProfData = require("../../controllers/user/getProfData");

const userRouter = express.Router();

userRouter.get("/",getProfData);

module.exports = userRouter;